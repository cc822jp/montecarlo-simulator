import { LitElement, html, customElement, property, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

export enum TYPE {
  PRIMARY,
  SECONDARY
}

@customElement('cc-button')
export class ActionButton extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Number }) type: TYPE = TYPE.PRIMARY;

  static get styles() {
    return css`
      .button {
        display: block;
        font-size: 2.2rem;
        font-family: Oswald, sans-serif;
        padding: 0.8rem;
        line-height: 1;
        border-radius: 0.8rem;
        min-width: 6rem;
        text-align: center;
        cursor: pointer;
        box-shadow: 0.4rem 0.4rem 0.4rem rgba(0, 0, 0, 0.2);
        -webkit-user-select: none;
        user-select: none;
      }

      .button:active {
      opacity: 0.5;
      }

      .button--primary {
        color: #fff;
        background: linear-gradient(-135deg, #f44336, #e53935);
      }

      .button--secondary {
        color: #fff;
        background: linear-gradient(-135deg, #2196f3, #1976d2);
      }
    `;
  }

  /**
   * for touch device
   * @see https://qiita.com/junya/items/3ff380878f26ca447f85
   */
  emptyHandler() {
  }

  render() {
    const { title, type } = this;
    return html`
      <div
        class="${classMap({
          button: true,
          'button--primary': type === TYPE.PRIMARY,
          'button--secondary': type === TYPE.SECONDARY
        })}"
        @touchstart="${this.emptyHandler}"
      >
        ${title}
      </div>
    `;
  }
}
