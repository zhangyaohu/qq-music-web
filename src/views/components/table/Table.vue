<script>
export default {
  name: "Table",
  props: {
    columns: {
      type: Array,
      default: []
    },
    dataSource: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "selection"
    }
  },
  data() {
    return {
      selection: [],
      isAllSelected: false
    };
  },
  render(h) {
    return (
      <div id="table">
        <div class="table_header">
          <ul class="table_header_tr">
            {this.type === "selection" ? (
              <li class="table_header__item checkbox">
                <el-checkbox
                  value={this.isAllSelected}
                  onChange={this._toggleAllSelection}
                ></el-checkbox>
              </li>
            ) : null}
            {this.columns.map((column, index) => {
              return (
                <li class="table_header__item" style={{ width: column.width }}>
                  <div class="table_header__item_content">{column.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div class="table_body">
          {this.dataSource.map((data, dI) => {
            return (
              <ul class="table_body_tr">
                {this.type === "selection" ? (
                  <li class="table_body__item checkbox">
                    <el-checkbox
                      value={this.selection.indexOf(data) > -1}
                      onChange={e => this.toggleRowSelection(data, dI, e)}
                    ></el-checkbox>
                  </li>
                ) : null}
                {this.columns.map((column, cI) => {
                  if (!column.render) {
                    return (
                      <li
                        class="table_body__item"
                        style={{ width: column.width }}
                        title={data && data[column.key]}
                      >
                        <div class="table_body__item_content">
                          {data && data[column.key]}
                        </div>
                      </li>
                    );
                  } else if (column.render) {
                    return (
                      <li
                        class="table_body__item"
                        style={{ width: column.width }}
                      >
                        <div class="table_body__item_content">
                          {data && column.render(data, column.key, dI)}
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            );
          })}
        </div>
      </div>
    );
  },

  methods: {
    _toggleAllSelection: function _toggleAllSelection() {
      var _states$data = this.dataSource,
        data = _states$data === undefined ? [] : _states$data,
        selection = this.selection;
      // when only some rows are selected (but not all), select or deselect all of them
      // depending on the value of selectOnIndeterminate

      var value = !this.isAllSelected;
      this.isAllSelected = value;

      var selectionChanged = false;
      data.forEach((row, index) => {
        if (this.toggleRowStatus(selection, row, value)) {
          selectionChanged = true;
        }
      });

      if (selectionChanged) {
        this.$emit("selection-change", selection ? selection.slice() : []);
      }
      this.$emit("select-all", selection);
    },
    toggleRowSelection(item, dI, selected) {
      var emitChange =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : true;
      var changed = this.toggleRowStatus(this.selection, item, selected);
      if (changed) {
        var newSelection = (this.selection || []).slice();
        // 调用 API 修改选中值，不触发 select 事件
        if (emitChange) {
          this.$emit("select", newSelection, item);
        }
        this.$emit("selection-change", newSelection);
        this.updateAllSelected();
      }
    },

    updateAllSelected() {
      if (this.selection.length === this.dataSource.length)
        this.isAllSelected = true;
      else this.isAllSelected = false;
    },
    toggleRowStatus(statusArr, row, newVal) {
      var changed = false;
      var index = statusArr.indexOf(row);
      var included = index !== -1;

      var addRow = function addRow() {
        statusArr.push(row);
        changed = true;
      };
      var removeRow = function removeRow() {
        statusArr.splice(index, 1);
        changed = true;
      };

      if (typeof newVal === "boolean") {
        if (newVal && !included) {
          addRow();
        } else if (!newVal && included) {
          removeRow();
        }
      } else {
        if (included) {
          removeRow();
        } else {
          addRow();
        }
      }
      return changed;
    }
  },

  watch: {}
};
</script>

<style lang="less" scoped>
.checkbox {
  text-align: center !important;
  width: 5%;
}
</style>