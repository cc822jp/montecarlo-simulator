import { LitElement, html, customElement, css, property } from 'lit-element';
import { STATUS } from './constants';
import { TYPE as TITLE_TYPE } from './components/title';
import { TYPE as BUTTON_TYPE } from './components/button';
import './components/intro';
import './components/finish';

@customElement('cc-monte-carlo')
export class App extends LitElement {
  @property({ type: Number }) game = 0;
  @property({ type: Array }) sequence = [];
  @property({ type: Number }) bet = 0;
  @property({ type: Number }) totalBet = 0;
  @property({ type: Number }) totalWin = 0;
  @property({ type: Number }) status = STATUS.INTRO;
  @property({ type: Number }) ratio = 2;

  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        padding: 10px;
        max-width: 1024px;
        margin: 0 auto;
        font-family: Oswald, sans-serif;
      }

      .bet {
        font-size: 3rem;
        text-align: center;
        font-weight: bold;
      }

      .controller {
        display: flex;
        justify-content: space-evenly;
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('sequence')) {
      this.bet = this.getBet();
    }
  }

  /**
   * Play Game
   */
  playGame() {
    this.game = 1;
    this.sequence = [1, 2, 3];
    this.status = STATUS.START;
  }

  /**
   * calculate bet from sequence
   */
  getBet() {
    const first = this.sequence.concat().pop();
    const last = this.sequence.concat().shift();
    return first + last || 0;
  }

  /**
   * Lose
   */
  handleTapLose() {
    this.game += 1;
    this.sequence = [...this.sequence, this.bet];
    this.totalBet += this.bet;
  }

  /**
   * Win
   */
  handleTapWin() {
    this.game += 1;
    this.sequence = this.sequence.slice(1, -1);
    this.totalBet += this.bet;
    this.totalWin += this.bet * this.ratio;

    if (this.sequence.length <= 1) {
      this.status = STATUS.END;
    }
  }

  render() {
    return html`
      <cc-title title="MONTE CARLO SIMULATOR"></cc-title>

      <!-- game summary -->
      <div class="game">GAME: ${this.game}</div>
      <div class="totalBet">TOTAL BET: $${this.totalBet}</div>
      <div class="totalWin">TOTAL WIN: $${this.totalWin}</div>
      <div class="sequence">SEQUENCE: ${this.sequence.join(', ')}</div>

      <!-- next bet -->
      <cc-title type="${TITLE_TYPE.SECONDARY}" title="NEXT BET IS"></cc-title>
      <div class="bet">$${this.bet}</div>

      <!-- game result -->
      <cc-title type="${TITLE_TYPE.SECONDARY}" title="GAME RESULT"></cc-title>
      <div class="controller">
        <cc-button
          type="${BUTTON_TYPE.SECONDARY}"
          title="LOSE"
          @click="${this.handleTapLose}"
        ></cc-button>
        <cc-button
          type="${BUTTON_TYPE.PRIMARY}"
          title="WIN"
          @click="${this.handleTapWin}"
        ></cc-button>
      </div>

      <!-- modal -->
      <cc-intro
        ?show="${this.status === STATUS.INTRO}"
        @play-game="${this.playGame}"
      ></cc-intro>

      <cc-finish
        ?show="${this.status === STATUS.END}"
        win="${this.totalWin - this.totalBet}"
      ></cc-finish>
    `;
  }
}
