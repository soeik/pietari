# Pietari 💎

A collection of tiny, high-value functional utilities inspired by **Ramda** and **Folktale**. 

Designed to provide essential functional primitives with zero dependencies and a focus on developer experience in TypeScript/JavaScript environments.

### Why Pietari?
In many projects, pulling in a massive library for a few monadic or utility functions is overkill. `pietari` aims to be the "Swiss Army Knife" for functional programmers:
- **Lightweight:** Minimal footprint with high utility.
- **Functional First:** Built with composition, currying, and immutability in mind.


### Key Influences
- **Folktale:** For the focus on robust error handling and monadic structures.
- **Ramda:** For the elegance of data-last, curried functions.

### Installation
```bash
npm install pietari
```

### Usage

`pietari` provides a clean, declarative way to handle data flow and optionality without the boilerplate of traditional imperative logic.

#### 🧩 Handling Optionality with `Maybe`
Avoid `null` checks and "undefined is not a function" errors.

```javascript
import { maybe } from 'pietari';

const user = { id: 1, profile: { name: 'Kirill' } };

const userName = maybe.fromNullable(user)
  .map(u => u.profile)
  .map(p => p.name)
  .getOrElse('Anonymous');

console.log(userName); // 'Kirill'
```

