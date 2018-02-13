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
    urls: Array,
    iconSize: String,
  },
  methods: {
    handleAgeDaysChange({ target }) {
      const { id, hours } = this;
      const newHours = (Number(target.value) * 24) + getHours(hours);

      this.$store.dispatch('updateIconRuleCondition', { ruleIdx: id, hours: newHours });
    },
    handleAgeHoursChange({ target }) {
      const { id, hours } = this;
      const newHours = Number(target.value) + (getDays(hours) * 24);

      this.$store.dispatch('updateIconRuleCondition', { ruleIdx: id, hours: newHours });
    },
    handleUrlChange(url, idx) {
      this.$store.dispatch('updateIconRuleUrl', {
        ruleIdx: this.id,
        urlIdx: idx,
        url,
      });
    },
    handleIconSizeChange({ target }) {
      this.$store.dispatch('updateIconRuleSize', { ruleIdx: this.id, size: target.value });
    },
    handleUrlDelete(idx) {
      this.$store.dispatch('deleteIconRuleUrl', { ruleIdx: this.id, urlIdx: idx });
    },
    handleAddUrl() {
      this.$store.dispatch('addIconRuleUrl', this.id);
    },
    handleDeleteRule() {
      this.$store.dispatch('deleteIconRule', this.id);
    },
    renderCondition(totalHours) {
      if (totalHours === null) {
        return (
          <div class="rule__row">
            Others
          </div>
        );
      }
      const days = getDays(totalHours);
      const hours = getHours(totalHours);

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
    renderUrlInput(url, idx) {
      const deleteButton = (idx > 0) ? (
        <button onClick={() => { this.handleUrlDelete(idx); }}> - </button>
      ) : null;

      return (
        <div class="rule__row">
          <input
            class="url-input"
            value={url}
            onChange={({ target }) => this.handleUrlChange(target.value, idx)}
            onKeydown={Util.handleInputKeyDown}
          />
          {deleteButton}
        </div>
      );
    },
    renderImg(url, size) {
      if (!url) {
        return null;
      }

      return (
        <img
          class="icon-preview"
          src={url}
          alt="icon"
          style={{ height: size }}
        />
      );
    },
  },
  render() {
    const {
      id,
      hours,
      urls,
      iconSize,
    } = this;
    const deleteButton = ((id > 0) && (hours !== null)) ? (
      <div class="rule__row delete">
        <button onClick={this.handleDeleteRule}>Delete rule</button>
      </div>
    ) : null;

    return (
      <div class="rule">
        {this.renderCondition(hours)}
        <div class="rule__row">
          <span class="label">Icons:</span>{urls.map(url => (this.renderImg(url, iconSize)))}
        </div>
        {urls.map((url, idx) => (this.renderUrlInput(url, idx)))}
        <span class="label">Icon Size:</span>
        <input
          value={iconSize}
          onChange={this.handleIconSizeChange}
          onKeydown={Util.handleInputKeyDown}
        />
        <div class="rule__row add">
          <button onClick={this.handleAddUrl}>+</button>
        </div>
        {deleteButton}
      </div>
    );
  },
};
