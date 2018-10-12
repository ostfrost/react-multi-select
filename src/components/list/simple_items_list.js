import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./list.scss";

class SimpleItemsList extends PureComponent {
  static propTypes = {
    renderer: PropTypes.any,
    noItemsRenderer: PropTypes.any,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.number,
    onClick: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.array,
    disabled: PropTypes.bool,
    disabledItemsTooltip: PropTypes.string
  };

  static defaultProps = {
    itemHeight: 40,
    height: 400,
    offset: 0,
    selectedIds: [],
    items: [],
    disabled: false
  };

  constructor(props) {
    super(props);
  }

  update() {
    return;
  }

  onClick(event, id, disabled) {
    const { onClick, selectedIds } = this.props;
    const checked = selectedIds.includes(id);
    if ((disabled && checked) || !disabled) {
      onClick(event, id);
    }
  }

  rowRenderer(item, key) {
    const {
      renderer,
      itemHeight,
      selectedIds,
      disabledItemsTooltip
    } = this.props;
    const Renderer = renderer;
    const checked = selectedIds.includes(item.id);
    const disabled = this.props.disabled || item.disabled;
    return (
      <div
        key={key}
        className={styles.list_item}
        onClick={event => this.onClick(event, item.id, disabled)}
        title={disabled ? disabledItemsTooltip : undefined}
      >
        <Renderer
          item={item}
          height={itemHeight}
          checked={checked}
          disabled={disabled && !checked}
        />
      </div>
    );
  }

  render() {
    const { items } = this.props;
    return (
      <div className="simple-item-list">
        {items.map((item, index) => {
          return this.rowRenderer(item, index);
        })}
      </div>
    );
  }
}

export default SimpleItemsList;
