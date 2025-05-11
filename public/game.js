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
          --num-rows: 8;
          --num-cols: 11;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          display: grid;
          grid-template-areas:
            "score progress refresh"
            "board board board";
          grid-template-columns: max-content 1fr max-content;
          align-items: center;
          justify-items: center;
          grid-gap: 10px;
        }

        .score {
          grid-area: score;

          position: relative;
          width: 60px;
          height: 60px;
          transform: translateY(-6px);

          path {
            fill: var(--color-apple-icon);
          }

          span {
            position: absolute;
            top: 7px;
            left: 0;
            width: 100%;
            height: 100%;
            color: white;
            font-size: 24px;

            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .progress {
          grid-area: progress;

          width: 100%;
          height: 40px;
          background-color: var(--color-progress-bg);
          border: 8px solid var(--color-progress-border);
          border-radius: 12px;
          overflow: hidden;

          div {
            width: 100%;
            height: 100%;
            background-color: var(--color-progress-thumb);

            transform: scaleX(0.6);
            transform-origin: top left;
          }
        }

        .refresh {
          grid-area: refresh;

          width: 70px;
          height: 70px;
          background-color: var(--color-refresh-bg);
          border: 5px solid var(--color-refresh-border);
          border-radius: 50%;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .board {
          --padding: 5px;
          --border: 8px;
          --board-width: 600px;
          --board-inner-width: calc(
            var(--board-width) - var(--border) * 2 - var(--padding) * 2
          );
          --apple-size: calc(var(--board-inner-width) / var(--num-cols));

          grid-area: board;

          padding: var(--padding);
          background-color: var(--color-board-bg);
          border: var(--border) solid var(--color-board-border);
          border-radius: 12px;

          display: grid;
          grid-template-rows: repeat(var(--num-rows), var(--apple-size));
          grid-template-columns: repeat(var(--num-cols), var(--apple-size));

          .apple {
            position: relative;
            padding: 2px;

            path {
              fill: var(--color-apple-icon);
            }

            span {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 11%;
              left: 0;
              color: white;
              font-size: calc(var(--apple-size) / 2.2);

              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      </style>

      <template id="apple-icon">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <path
            style="fill: #6b6b6b"
            d="M110.291,16.528c0,0,105.156-28.254,133.495,65.21C243.785,81.738,170.185,125.652,110.291,16.528z"
          />
          <path
            d="M238.343,169.456c-1.457-3.58-34.538-88.393,45.793-169.456l22.745,22.534c-65.016,65.614-39.904,132.172-38.809,134.969	L238.343,169.456z"
          />
          <path
            d="M360.196,109.621c-55.927,2.03-87.668,36.526-104.171,36.526s-48.244-34.496-104.171-36.526	C95.928,107.591,0.021,149.728,0.021,279.254S104.209,512,157.549,512s71.915-15.163,98.451-15.163S301.085,512,354.451,512	s157.528-103.227,157.528-232.746S416.123,107.591,360.196,109.621z"
          />
        </svg>
      </template>

      <div class="container">
        <div class="score">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <path
              style="fill: #6b6b6b"
              d="M110.291,16.528c0,0,105.156-28.254,133.495,65.21C243.785,81.738,170.185,125.652,110.291,16.528z"
            />
            <path
              d="M238.343,169.456c-1.457-3.58-34.538-88.393,45.793-169.456l22.745,22.534c-65.016,65.614-39.904,132.172-38.809,134.969	L238.343,169.456z"
            />
            <path
              d="M360.196,109.621c-55.927,2.03-87.668,36.526-104.171,36.526s-48.244-34.496-104.171-36.526	C95.928,107.591,0.021,149.728,0.021,279.254S104.209,512,157.549,512s71.915-15.163,98.451-15.163S301.085,512,354.451,512	s157.528-103.227,157.528-232.746S416.123,107.591,360.196,109.621z"
            />
          </svg>
          <span>100</span>
        </div>
        <div class="progress">
          <div></div>
        </div>
        <button class="refresh">
          <img src="/refresh.png" />
        </button>
        <div class="board"></div>
      </div>
    `;

    this.$board = this.$root.querySelector(".board");
    this.$appleIcon = this.$root.querySelector("#apple-icon").content;

    const styles = window.getComputedStyle(this.$board);
    this.numRows = styles.getPropertyValue("--num-rows");
    this.numCols = styles.getPropertyValue("--num-cols");

    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const $apple = document.createElement("div");
        $apple.className = "apple";

        const $icon = this.$appleIcon.cloneNode(true);
        const $number = document.createElement("span");
        $number.textContent = Math.floor(Math.random() * 9) + 1;

        $apple.appendChild($icon);
        $apple.appendChild($number);
        this.$board.appendChild($apple);
      }
    }
  }
}

customElements.define("apple-game-board", AppleGameBoard);
