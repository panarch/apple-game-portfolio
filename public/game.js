export default class AppleGameBoard extends HTMLElement {
  constructor() {
    super();
    this.$root = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    const html = (v) => v[0];

    this.$root.innerHTML = html`
      <style>
        :host {
        }

        .board {
          grid-area: board;

          width: 600px;
          height: 400px;
          background-color: var(--color-board-bg);
          border: 8px solid var(--color-board-border);
          border-radius: 12px;

          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>

      <div class="board">game board</div>
    `;
  }
}

customElements.define("apple-game-board", AppleGameBoard);
