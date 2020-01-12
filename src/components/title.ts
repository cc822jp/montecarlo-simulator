import { LitElement, html, customElement, property, css } from 'lit-element';

export enum TYPE {
  PRIMARY,
  SECONDARY
}

@customElement('cc-title')
export class Title extends LitElement {
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
    if (this.type === TYPE.SECONDARY) {
      return html`
        <h2>${this.title}</h2>
      `;
    }

    return html`
      <h1>${this.title}</h1>
    `;
  }
}
