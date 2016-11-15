'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// import _ from './utils'

var defaultButton = function defaultButton(props) {
  return _react2.default.createElement(
    'button',
    _extends({}, props, { className: '-btn' }),
    props.children
  );
};

exports.default = _react2.default.createClass({
  displayName: 'pagination',
  getInitialState: function getInitialState() {
    return {
      page: this.props.currentPage
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ page: nextProps.currentPage });
  },
  getSafePage: function getSafePage(page) {
    return Math.min(Math.max(page, 0), this.props.pagesLength - 1);
  },
  changePage: function changePage(page) {
    page = this.getSafePage(page);
    this.setState({ page: page });
    this.props.onChange(page);
  },
  applyPage: function applyPage(e) {
    e && e.preventDefault();
    var page = this.state.page;
    this.changePage(page === '' ? this.props.currentPage : page);
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        currentPage = _props.currentPage,
        pagesLength = _props.pagesLength,
        showPageSizeOptions = _props.showPageSizeOptions,
        pageSizeOptions = _props.pageSizeOptions,
        pageSize = _props.pageSize,
        showPageJump = _props.showPageJump,
        canPrevious = _props.canPrevious,
        canNext = _props.canNext,
        onPageSizeChange = _props.onPageSizeChange;


    var PreviousComponent = this.props.previousComponent || defaultButton;
    var NextComponent = this.props.nextComponent || defaultButton;

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.props.paginationClassName, '-pagination'),
        style: this.props.paginationStyle
      },
      _react2.default.createElement(
        'div',
        { className: '-previous' },
        _react2.default.createElement(
          PreviousComponent,
          {
            onClick: function onClick(e) {
              if (!canPrevious) return;
              _this.changePage(currentPage - 1);
            },
            disabled: !canPrevious
          },
          this.props.previousText
        )
      ),
      _react2.default.createElement(
        'div',
        { className: '-center' },
        _react2.default.createElement(
          'span',
          { className: '-pageInfo' },
          'Page ',
          showPageJump ? _react2.default.createElement(
            'form',
            { className: '-pageJump',
              onSubmit: this.applyPage
            },
            _react2.default.createElement('input', {
              type: this.state.page === '' ? 'text' : 'number',
              onChange: function onChange(e) {
                var val = e.target.value;
                var page = val - 1;
                if (val === '') {
                  return _this.setState({ page: val });
                }
                _this.setState({ page: _this.getSafePage(page) });
              },
              value: this.state.page === '' ? '' : this.state.page + 1,
              onBlur: this.applyPage
            })
          ) : _react2.default.createElement(
            'span',
            { className: '-currentPage' },
            currentPage + 1
          ),
          ' of ',
          _react2.default.createElement(
            'span',
            { className: '-totalPages' },
            pagesLength
          )
        ),
        showPageSizeOptions && _react2.default.createElement(
          'span',
          { className: 'select-wrap -pageSizeOptions' },
          _react2.default.createElement(
            'select',
            {
              onChange: function onChange(e) {
                return onPageSizeChange(Number(e.target.value));
              },
              value: pageSize
            },
            pageSizeOptions.map(function (option, i) {
              return _react2.default.createElement(
                'option',
                {
                  key: i,
                  value: option },
                option,
                ' rows'
              );
            })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: '-next' },
        _react2.default.createElement(
          NextComponent,
          {
            onClick: function onClick(e) {
              if (!canNext) return;
              _this.changePage(currentPage + 1);
            },
            disabled: !canNext
          },
          this.props.nextText
        )
      )
    );
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiY3JlYXRlQ2xhc3MiLCJnZXRJbml0aWFsU3RhdGUiLCJwYWdlIiwiY3VycmVudFBhZ2UiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJnZXRTYWZlUGFnZSIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwYWdlc0xlbmd0aCIsImNoYW5nZVBhZ2UiLCJvbkNoYW5nZSIsImFwcGx5UGFnZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXRlIiwicmVuZGVyIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY2FuUHJldmlvdXMiLCJjYW5OZXh0Iiwib25QYWdlU2l6ZUNoYW5nZSIsIlByZXZpb3VzQ29tcG9uZW50IiwicHJldmlvdXNDb21wb25lbnQiLCJOZXh0Q29tcG9uZW50IiwibmV4dENvbXBvbmVudCIsInBhZ2luYXRpb25DbGFzc05hbWUiLCJwYWdpbmF0aW9uU3R5bGUiLCJwcmV2aW91c1RleHQiLCJ2YWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsIk51bWJlciIsIm1hcCIsIm9wdGlvbiIsImkiLCJuZXh0VGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFDQTtBQUNBOztBQUVBLElBQU1BLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsS0FBRDtBQUFBLFNBQ3BCO0FBQUE7QUFBQSxpQkFBWUEsS0FBWixJQUFtQixXQUFVLE1BQTdCO0FBQXFDQSxVQUFNQztBQUEzQyxHQURvQjtBQUFBLENBQXRCOztrQkFJZSxnQkFBTUMsV0FBTixDQUFrQjtBQUFBO0FBQy9CQyxpQkFEK0IsNkJBQ1o7QUFDakIsV0FBTztBQUNMQyxZQUFNLEtBQUtKLEtBQUwsQ0FBV0s7QUFEWixLQUFQO0FBR0QsR0FM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dCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG4vL1xuLy8gaW1wb3J0IF8gZnJvbSAnLi91dGlscydcblxuY29uc3QgZGVmYXVsdEJ1dHRvbiA9IChwcm9wcykgPT4gKFxuICA8YnV0dG9uIHsuLi5wcm9wc30gY2xhc3NOYW1lPSctYnRuJz57cHJvcHMuY2hpbGRyZW59PC9idXR0b24+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogdGhpcy5wcm9wcy5jdXJyZW50UGFnZVxuICAgIH1cbiAgfSxcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTogbmV4dFByb3BzLmN1cnJlbnRQYWdlfSlcbiAgfSxcbiAgZ2V0U2FmZVBhZ2UgKHBhZ2UpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocGFnZSwgMCksIHRoaXMucHJvcHMucGFnZXNMZW5ndGggLSAxKVxuICB9LFxuICBjaGFuZ2VQYWdlIChwYWdlKSB7XG4gICAgcGFnZSA9IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSlcbiAgICB0aGlzLnNldFN0YXRlKHtwYWdlfSlcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHBhZ2UpXG4gIH0sXG4gIGFwcGx5UGFnZSAoZSkge1xuICAgIGUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgcGFnZSA9IHRoaXMuc3RhdGUucGFnZVxuICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlID09PSAnJyA/IHRoaXMucHJvcHMuY3VycmVudFBhZ2UgOiBwYWdlKVxuICB9LFxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1cnJlbnRQYWdlLFxuICAgICAgcGFnZXNMZW5ndGgsXG4gICAgICBzaG93UGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemVPcHRpb25zLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBzaG93UGFnZUp1bXAsXG4gICAgICBjYW5QcmV2aW91cyxcbiAgICAgIGNhbk5leHQsXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlXG4gICAgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IFByZXZpb3VzQ29tcG9uZW50ID0gdGhpcy5wcm9wcy5wcmV2aW91c0NvbXBvbmVudCB8fCBkZWZhdWx0QnV0dG9uXG4gICAgY29uc3QgTmV4dENvbXBvbmVudCA9IHRoaXMucHJvcHMubmV4dENvbXBvbmVudCB8fCBkZWZhdWx0QnV0dG9uXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModGhpcy5wcm9wcy5wYWdpbmF0aW9uQ2xhc3NOYW1lLCAnLXBhZ2luYXRpb24nKX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMucGFnaW5hdGlvblN0eWxlfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nLXByZXZpb3VzJz5cbiAgICAgICAgICA8UHJldmlvdXNDb21wb25lbnRcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghY2FuUHJldmlvdXMpIHJldHVyblxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UoY3VycmVudFBhZ2UgLSAxKVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshY2FuUHJldmlvdXN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMucHJldmlvdXNUZXh0fVxuICAgICAgICAgIDwvUHJldmlvdXNDb21wb25lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nLWNlbnRlcic+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSctcGFnZUluZm8nPlxuICAgICAgICAgICAgUGFnZSB7c2hvd1BhZ2VKdW1wID8gKFxuICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9Jy1wYWdlSnVtcCdcbiAgICAgICAgICAgICAgICBvblN1Ym1pdD17dGhpcy5hcHBseVBhZ2V9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMuc3RhdGUucGFnZSA9PT0gJycgPyAndGV4dCcgOiAnbnVtYmVyJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHZhbCAtIDFcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7cGFnZTogdmFsfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwYWdlOiB0aGlzLmdldFNhZmVQYWdlKHBhZ2UpfSlcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYWdlID09PSAnJyA/ICcnIDogdGhpcy5zdGF0ZS5wYWdlICsgMX1cbiAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5hcHBseVBhZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nLWN1cnJlbnRQYWdlJz57Y3VycmVudFBhZ2UgKyAxfTwvc3Bhbj5cbiAgICAgICAgICAgICl9IG9mIDxzcGFuIGNsYXNzTmFtZT0nLXRvdGFsUGFnZXMnPntwYWdlc0xlbmd0aH08L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIHtzaG93UGFnZVNpemVPcHRpb25zICYmIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2VsZWN0LXdyYXAgLXBhZ2VTaXplT3B0aW9ucyc+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uUGFnZVNpemVDaGFuZ2UoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3BhZ2VTaXplT3B0aW9ucy5tYXAoKG9wdGlvbiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17b3B0aW9ufT5cbiAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9ufSByb3dzXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9Jy1uZXh0Jz5cbiAgICAgICAgICA8TmV4dENvbXBvbmVudFxuICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFjYW5OZXh0KSByZXR1cm5cbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKGN1cnJlbnRQYWdlICsgMSlcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhbk5leHR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dFRleHR9XG4gICAgICAgICAgPC9OZXh0Q29tcG9uZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSlcbiJdfQ==