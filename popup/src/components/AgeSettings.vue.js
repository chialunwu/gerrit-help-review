import AgeSettingRule from './AgeSettingRule.vue';
import Util from '../util';

export default {
  props: {
    afterColumnName: String,
    columnName: String,
    rules: Array,
  },
  methods: {
    handleColumnChange({ target }) {
      this.$store.dispatch('updateAgeColumn', target.value);
    },
    handleTargetColumnChange({ target }) {
      this.$store.dispatch('updateAgeTargetColumn', target.value);
    },
    handleAddRule() {
      this.$store.dispatch('addAgeRule');
    },
  },
  render() {
    const {
      columnName,
      afterColumnName,
      rules,
    } = this;

    return (
      <div class="container">
        <div class="header">Age</div>
        <div class="row">
          Column Name
          <input
            value={columnName}
            onChange={this.handleColumnChange}
            onKeydown={Util.handleInputKeyDown}
          />
        </div>
        <div class="row">
          After Column
          <input
            value={afterColumnName}
            onChange={this.handleTargetColumnChange}
            onKeydown={Util.handleInputKeyDown}
          />
        </div>
        <div class="row">
          Rules
        </div>
        {rules.map((rule, idx) =>
          (<AgeSettingRule id={idx} hours={rule.hours} color={rule.color} />))}
        <div class="row add">
          <button onClick={this.handleAddRule}> Add Rule </button>
        </div>
      </div>
    );
  },
};
