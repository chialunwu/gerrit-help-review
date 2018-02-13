import Util from '../util';

function getDays(hours) {
  return Math.floor(hours / 24);
}

function getHours(hours) {
  return Math.floor(hours % 24);
}

export default {
  props: {
    id: Number,
    hours: Number,
    color: String,
  },
  methods: {
    handleAgeDaysChange({ target }) {
      const { id, hours } = this;
      const newHours = (Number(target.value) * 24) + getHours(hours);

      this.$store.dispatch('updateAgeRuleCondition', { ruleIdx: id, hours: newHours });
    },
    handleAgeHoursChange({ target }) {
      const { id, hours } = this;
      const newHours = Number(target.value) + (getDays(hours) * 24);

      this.$store.dispatch('updateAgeRuleCondition', { ruleIdx: id, hours: newHours });
    },
    handleColorChange({ target }) {
      this.$store.dispatch('updateAgeRuleColor', { ruleIdx: this.id, color: target.value.trim() });
    },
    handleDeleteRule() {
      this.$store.dispatch('deleteAgeRule', this.id);
    },
    renderCondition(totalHours) {
      if (totalHours === null) {
        return (
          <div class="rule__row">
            Others
          </div>
        );
      }
      const days = Math.floor(totalHours / 24);
      const hours = Math.floor(totalHours % 24);

      return (
        <div class="rule__row">
          Review age &lt;
          <input
            class="age-input"
            value={days}
            type="number"
            min={0}
            onChange={this.handleAgeDaysChange}
            onKeydown={Util.handleInputKeyDown}
          /> days
          <input
            class="age-input"
            value={hours}
            type="number"
            min={0}
            onChange={this.handleAgeHoursChange}
            onKeydown={Util.handleInputKeyDown}
          /> hours
        </div>
      );
    },
  },
  render() {
    const {
      id,
      hours,
      color,
    } = this;
    const inputStyle = { color };
    const deleteButton = ((id > 0) && (hours !== null)) ? (
      <div class="rule__row delete">
        <button onClick={this.handleDeleteRule}>Delete rule</button>
      </div>
    ) : null;

    return (
      <div class="rule">
        {this.renderCondition(hours)}
        <div class="rule__row">
          Color:
          <input
            value={color}
            style={inputStyle}
            onChange={this.handleColorChange}
            onKeydown={Util.handleInputKeyDown}
          />
        </div>
        {deleteButton}
      </div>
    );
  },
};
