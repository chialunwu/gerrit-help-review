import IconSettingRule from './IconSettingRule.vue';
import Util from '../util';


export default {
  props: {
    afterColumnName: String,
    columnName: String,
    reviewAgainUrl: String,
    rules: Array,
  },
  methods: {
    handleColumnChange({ target }) {
      this.$store.dispatch('updateIconColumn', target.value);
    },
    handleTargetColumnChange({ target }) {
      this.$store.dispatch('updateIconTargetColumn', target.value);
    },
    handleReviewAgainUrlChange({ target }) {
      this.$store.dispatch('updateIconReviewAgainUrl', target.value);
    },
    handleAddRule() {
      this.$store.dispatch('addIconRule');
    },
  },
  render() {
    const {
      columnName,
      afterColumnName,
      reviewAgainUrl,
      rules,
    } = this;

    return (
      <div class="container">
        <div class="header">Icons</div>
        <div class="row">
          <span class="label">Column Name</span>
          <input
            value={columnName}
            onChange={this.handleColumnChange}
            onKeydown={Util.handleInputKeyDown}
          />
        </div>
        <div class="row">
          <span class="label">After Column</span>
          <input
            value={afterColumnName}
            onChange={this.handleTargetColumnChange}
            onKeydown={Util.handleInputKeyDown}
          />
        </div>
        <div class="row">
          <span class="label">Review again icon</span>
          <img class="icon-preview" src={reviewAgainUrl} alt="icon" />
        </div>
        <div class="row">
          <input
            style={{ width: '100%' }}
            value={reviewAgainUrl}
            onChange={this.handleReviewAgainUrlChange}
            onKeydown={Util.handleInputKeyDown}
          />
        </div>
        <div class="row">
          Rules
        </div>
        {rules.map((rule, idx) =>
          (<IconSettingRule
            id={idx}
            hours={rule.hours}
            urls={rule.urls}
            iconSize={rule.iconSize}
          />))}
        <div class="row add">
          <button onClick={this.handleAddRule}> Add Rule </button>
        </div>
      </div>
    );
  },
};
