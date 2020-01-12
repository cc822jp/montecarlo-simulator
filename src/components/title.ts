import { LitElement, html, customElement, property, css } from 'lit-element';

export enum TYPE {
  PRIMARY,
  SECONDARY
}

@customElement('cc-title')
export class ActionButton extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Number }) type: TYPE = TYPE.PRIMARY;

  static get styles() {
    return css`
      h1,
      h2 {
        display: block;
        text-align: center;
        font-family: Oswald, sans-serif;
      }
    `;
  }

  render() {
    const { title, type } = this;

    if (type === TYPE.SECONDARY) {
      return html`
        <h2>${title}</h2>
      `;
    }

    return html`
      <h1>${title}</h1>
    `;
  }
}
