import { LitElement, html, customElement, property, css } from 'lit-element';
import { TYPE as TITLE_TYPE } from './title';
import { TYPE as BUTTON_TYPE } from './button';

@customElement('cc-intro')
export class ActionButton extends LitElement {
  @property({ type: Boolean }) show = false;

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

      .controller {
        margin: 3rem 0;
      }

      .link {
        text-align: center;
      }
    `;
  }

  /**
   * play game
   */
  handleTapPlay() {
    this.dispatchEvent(
      new CustomEvent('play-game', {
        detail: {},
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="container">
        <cc-title title="MONTE CARLO METHOD SIMULATOR"></cc-title>

        <div class="controller">
          <cc-button
            type="${BUTTON_TYPE.PRIMARY}"
            title="PLAY GAME"
            @click="${this.handleTapPlay}"
          ></cc-button>
        </div>

        <cc-title
          type="${TITLE_TYPE.SECONDARY}"
          title="What's monte-carlo?"
        ></cc-title>

        <p class="link">
          See.
          <a
            href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/lecture-slides-and-files/MIT6_0002F16_lec6.pdf"
            target="_blank"
            >Monte Carlo Simulation - MIT OpenCourseWare</a
          >
        </p>
      </div>
    `;
  }
}
