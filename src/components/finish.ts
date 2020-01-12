import { LitElement, html, customElement, property, css } from 'lit-element';
import { TYPE as BUTTON_TYPE } from './button';

@customElement('cc-finish')
export class Finish extends LitElement {
  @property({ type: Boolean }) show = false;
  @property({ type: Number }) win = 0;

  static get styles() {
    return css`
      :host {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        box-sizing: border-box;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }

      :host([show]) {
        opacity: 1;
        pointer-events: auto;
      }

      .container {
        width: 100%;
        max-width: 640px;
      }

      .result {
        font-size: 3rem;
        text-align: center;
        font-weight: bold;
      }

      .controller {
        margin: 3rem 0;
      }
    `;
  }

  /**
   * next game
   */
  handleTapNext() {
    window.location.reload();
  }

  render() {
    // Very rarely, the total balance will be negative
    const sign = this.win > 0 ? '+' : '-';
    return html`
      <div class="container">
        <cc-title title="FINISH!"></cc-title>

        <div class="result">${sign}$${Math.abs(this.win)}</div>

        <div class="controller">
          <cc-button
            type="${BUTTON_TYPE.PRIMARY}"
            title="NEXT GAME"
            @click="${this.handleTapNext}"
          ></cc-button>
        </div>
      </div>
    `;
  }
}
