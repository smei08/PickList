# PickList — Decisions Log

A running record of the choices, tradeoffs, and bugs behind this project.

PickList is a React study project that redesigns Amazon's cart around one gap:
the cart already has a selection model (checkboxes, select-all) but the selection drives no bulk action. You can select items and then do nothing with the selection. This project adds the missing bulk actions.

> Note: not affiliated with Amazon. Product names and images are placeholders;
> the layout is recreated for study project purposes only.

---

## Problem framing

### The premise had to be corrected before building

The original idea was "Amazon's cart has multi-select", but can not move to save later section or delete all at once, same applies to saved for later section. Primary research (my own cart, desktop + app, plus developer scripts and a support
transcript) proved that: checkboxes and select-all already exist, but those actions does not apply.

**Lesson:** verify the current state of the thing you're critiquing before
designing against it. Interfaces change; assumptions rot.

### Scope: cart region only, not a full Amazon clone

Deliberately did not rebuild mega-menu, search, or footer
beyond a thin shell. Those teach nothing and differentiate nothing. The value
is entirely in the selection + bulk-action system, so that's where the effort
went.

---

## Core design decisions

### Bulk Save-for-later goes in the cart; bulk Delete goes in the saved list

This is the central design argument of the project.

- In the **cart**, the checkbox already means "I'm buying this" (it's what the
  subtotal counts). Attaching a destructive **delete** to that same checkbox is
  dangerous, because everything starts pre-selected — one misclick could wipe a
  full cart the user never consciously selected.
- **Save-for-later** is safe to attach to the cart selection: it's reversible.
  Items move to a list they can pull back from.
- **Delete** therefore lives in the **saved-for-later** section, where the
  checkbox has no competing "I'm buying this" meaning — it can only mean
  "act on this." No ambiguity, no pre-selection danger.

**Tradeoff** Individual delete still exists in the cart — only _bulk_ delete is
intentionally absent there. Users who want to clear many items at once do so
from the saved-for-later section instead. This keeps the destructive bulk
action in a place where the checkbox has no competing "I'm buying this"
meaning, and where the user is reviewing rather than mid-checkout.

**Supporting evidence:** a GitHub gist of Amazon saved-for-later bulk-delete
scripts has a commenter independently requesting checkbox-based selective bulk
delete — real-world confirmation the need is genuine, not hypothetical.

### The "50 clicks" claim only holds for large/total selections

Bulk save wins big when the user wants all or most items (1 click vs N). But
for a _partial_ selection it can invert: deselect-all + pick n + act = n+2
steps vs n today. Acknowledged rather than overstated; this is why a working
select-all / deselect-all matters.

### Checkbox kept visible (not replaced by whole-card selection)

Considered hiding the checkbox and making the whole card the selection target
with a colored border. Decided against fully hiding it: a checkbox is a learned
affordance — users know it means "select me" — while a click-to-select card is
less discoverable, especially for bulk actions. Kept the visible checkbox,
styled larger for a bigger hit target.

---

## Architecture

### All state lives in CartPage (lifting state up)

Selection, the cart list, and the saved list all live in `CartPage`, the
nearest common ancestor of every component that depends on them. `ItemRow`,
`SavedItem`, and `CartTotal` all read from the same source and stay in sync.

Early mistake: I first put per-row selection state (`useState(false)`) inside
`ItemRow`. That gave each row its own private boolean that `CartPage` couldn't
see — so no subtotal, no count, no select-all were possible. Lifting the state
up to `CartPage` fixed it. This is the single most important structural
decision in the project.

### Data flows down as props; events flow up as function calls

`ItemRow` holds no selection state. It receives `checked` (a boolean) and calls
`handleSelect(id)` on change. The parent owns the toggle logic and the state;
the child only announces "I was clicked, here's my id." Same pattern for
`onDelete`, `onSearch`, and every bulk action.

### Cart and saved have separate selection Sets

`selected` (cart) and `savedSelected` (saved) are independent. Checking items
in one list must not affect the other. Separate Sets + separate handlers
(`handleSelect` / `handleSavedSelect`), threaded down distinct prop paths.

### Buttons are plain <button> elements, not components

No `DeleteButton.jsx`. A component should hide real complexity; a labeled
button with an onClick doesn't. Shared appearance is handled with CSS classes.
Extraction is easy later if real shared logic appears.

### Static imports became state once lists could change

`initialCartItems` / `initialSavedItems` started as static imports. The moment
bulk actions _move items between the two lists_, both had to become
`useState(initialCartItems)` etc. All reads (totals, section props) were
re-pointed from the frozen imports to the stateful arrays — a step that's easy
to half-finish and leave the UI out of sync.

---

## Selection state (the Set)

### Selection is a Set of item ids, not booleans on items

`selected` holds ids of checked items. "Checked" is not stored anywhere — it's
_derived_ by asking `selected.has(item.id)` at render time.

Chose a Set over an array because:

- `.has()` is instant regardless of size; `.includes()` scans.
- A Set can't hold duplicates, so no defensive checks before adding.

### Derive, don't store

A recurring principle. Checked-status, subtotal, and item count are all
_computed_ from the Set + the arrays — none is stored in its own state. Every
time I reached for a second piece of state to "remember" one of these, it was
the wrong move: it created a second source of truth that could drift.

### Sets must be replaced, not mutated, in React

`selected.add(id); setSelected(selected)` fails silently — React compares object
identity, sees the same Set, and skips the re-render. Fix: copy first
(`new Set(prev)`), mutate the copy, return the new Set. Same rule applies to the
cart/saved arrays (spread into a new array, never `.push`).

---

## Money handling

### Prices stored as integer cents, formatted only at display

`0.1 + 0.2 !== 0.3` in JavaScript, so float dollars eventually produce an
off-by-a-penny subtotal. All prices are integer cents in logic; `formatPrice`
converts to a dollar string only at the moment of display. Corollary: never do
math on the output of `formatPrice` (it's a string). "Cents in logic, dollars
at display."

### subtotalCents defaults missing quantities

Saved items have no `quantity` field. `subtotalCents` uses
`item.quantity ?? 1` so a missing quantity can't poison the sum with `NaN`.

---

## Bugs encountered and fixed

### Prop-name mismatch → "Cannot read properties of undefined"

Passed `item` (singular) but destructured `items` (plural) in the row — the
child got `undefined`. Hit this more than once, on both the cart and saved
paths. Rule adopted: **plural (`items`) in the section, singular (`item`) in
the row**, always. A row destructuring `items` is the tell.

### Double-applied id → toggle canceled itself

Wrapped `handleSelect(item.id)` in the section _and_ again in the input's
onChange, so one click fired the toggle twice (add then remove = nothing). Fix:
attach the id in exactly one place, not both.

### Reduce returned 0 (comma operator) and NaN (formatted string)

An early subtotal reduce had two bugs at once: the initial value `0` was placed
_inside_ the callback as a comma expression (so it returned 0 every time), and
it multiplied `formatPrice(...)` — a string — producing NaN. Plus a
`priceCent` vs `priceCents` typo. Fix: raw cents in the math, `0` as reduce's
real second argument, format only at the end.

### Set has .size, not .length

`selected.length` is undefined — Sets use `.size`. (Same family as `.has` vs
`.includes`, `.add` vs `.push`.)

### `check` vs `checked` typo → uncontrolled/controlled warning

A misspelled `check={...}` attribute left the real `checked` unwired, so React
warned about an input flipping from uncontrolled to controlled. One-letter fix.

### $NaN after bulk move-to-cart → the data-shape bug

Moving a saved item into the cart produced `$NaN` and a blank quantity stepper,
because saved items have no `quantity` and the moved item arrived cart-shaped
but quantity-less. Fix: normalize on the way in —
`.map(item => ({ ...item, quantity: 1 }))` when moving to cart — plus the
`?? 1` guard in `subtotalCents` as a safety net.
**Lesson:** when the same object lives in two contexts with different required
fields, transform it at the boundary between them.

### Horizontal-scroll overflow → width: 100vw on the root

A pale strip appeared between the header and the scrollbar. Cause: `100vw` on
a root element includes the space _under_ the vertical scrollbar, making the
page ~15px too wide. Fix: use `width: 100%` for page-width elements, not
`100vw`. Added `box-sizing: border-box` and `body { margin: 0 }` as the
standard reset.

---

## Layout / CSS notes

### Item count is units, not rows

"Subtotal (N items)" counts summed quantities, not `selected.size`. (Where the
count intentionally shows rows instead, that's a deliberate choice, noted
inline.)

### Live filter vs submit — form or no form

Live-filter inputs (results update as you type) use a bare controlled input, no
`<form>`. A `<form>` is only for a real submit action (site search, login),
where it earns Enter-to-submit for free. Wrapping a live filter in a form only
introduces an accidental page reload to suppress.

### flex-basis: 0 in `flex: 1` is why items divide space evenly

`flex: 1` = grow 1, shrink 1, basis 0. The `0` basis makes flex items ignore
content width and split space equally, vs `flex-grow: 1` alone (basis auto)
which shares only leftover space. `min-width: 0` on a flex/grid child is
required to let long content shrink instead of overflowing — hit this on both
the search bar and the item rows.

### Reserve the selected border to prevent layout shift

A 2px border only on the selected state shifts every card by a pixel on select.
Fix: always render a 2px transparent border and only change its _color_ when
selected — recolor, don't resize.
