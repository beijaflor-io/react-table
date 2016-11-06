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


    var PreviousComponent = this.props.PreviousComponent || defaultButton;
    var NextComponent = this.props.NextComponent || defaultButton;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiY3JlYXRlQ2xhc3MiLCJnZXRJbml0aWFsU3RhdGUiLCJwYWdlIiwiY3VycmVudFBhZ2UiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJnZXRTYWZlUGFnZSIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwYWdlc0xlbmd0aCIsImNoYW5nZVBhZ2UiLCJvbkNoYW5nZSIsImFwcGx5UGFnZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0YXRlIiwicmVuZGVyIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY2FuUHJldmlvdXMiLCJjYW5OZXh0Iiwib25QYWdlU2l6ZUNoYW5nZSIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsInBhZ2luYXRpb25DbGFzc05hbWUiLCJwYWdpbmF0aW9uU3R5bGUiLCJwcmV2aW91c1RleHQiLCJ2YWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsIk51bWJlciIsIm1hcCIsIm9wdGlvbiIsImkiLCJuZXh0VGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFDQTtBQUNBOztBQUVBLElBQU1BLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ0MsS0FBRDtBQUFBLFNBQ3BCO0FBQUE7QUFBQSxpQkFBWUEsS0FBWixJQUFtQixXQUFVLE1BQTdCO0FBQXFDQSxVQUFNQztBQUEzQyxHQURvQjtBQUFBLENBQXRCOztrQkFJZSxnQkFBTUMsV0FBTixDQUFrQjtBQUFBO0FBQy9CQyxpQkFEK0IsNkJBQ1o7QUFDakIsV0FBTztBQUNMQyxZQUFNLEtBQUtKLEtBQUwsQ0FBV0s7QUFEWixLQUFQO0FBR0QsR0FMOEI7QUFNL0JDLDJCQU4rQixxQ0FNSkMsU0FOSSxFQU1PO0FB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LElBQVgsS0FBb0IsRUFBcEIsR0FBeUIsRUFBekIsR0FBOEIsS0FBS2UsS0FBTCxDQUFXZixJQUFYLEdBQWtCLENBVnpEO0FBV0Usc0JBQVEsS0FBS1k7QUFYZjtBQUhGLFdBREksR0FtQkY7QUFBQTtBQUFBLGNBQU0sV0FBVSxjQUFoQjtBQUFnQ1gsMEJBQWM7QUFBOUMsV0FwQk47QUFBQTtBQXFCUTtBQUFBO0FBQUEsY0FBTSxXQUFVLGFBQWhCO0FBQStCUTtBQUEvQjtBQXJCUixTQURGO0FBd0JHUSwrQkFDQztBQUFBO0FBQUEsWUFBTSxXQUFVLDhCQUFoQjtBQUNFO0FBQUE7QUFBQTtBQUNFLHdCQUFVLGtCQUFDSixDQUFEO0FBQUEsdUJBQU9VLGlCQUFpQlMsT0FBT25CLEVBQUVpQixNQUFGLENBQVNDLEtBQWhCLENBQWpCLENBQVA7QUFBQSxlQURaO0FBRUUscUJBQU9aO0FBRlQ7QUFJR0QsNEJBQWdCZSxHQUFoQixDQUFvQixVQUFDQyxNQUFELEVBQVNDLENBQVQsRUFBZTtBQUNsQyxxQkFDRTtBQUFBO0FBQUE7QUFDRSx1QkFBS0EsQ0FEUDtBQUVFLHlCQUFPRCxNQUZUO0FBR0dBLHNCQUhIO0FBQUE7QUFBQSxlQURGO0FBT0QsYUFSQTtBQUpIO0FBREY7QUF6QkosT0FmRjtBQTBERTtBQUFBO0FBQUEsVUFBSyxXQUFVLE9BQWY7QUFDRTtBQUFDLHVCQUFEO0FBQUE7QUFDRSxxQkFBUyxpQkFBQ3JCLENBQUQsRUFBTztBQUNkLGtCQUFJLENBQUNTLE9BQUwsRUFBYztBQUNkLG9CQUFLWixVQUFMLENBQWdCVCxjQUFjLENBQTlCO0FBQ0QsYUFKSDtBQUtFLHNCQUFVLENBQUNxQjtBQUxiO0FBT0csZUFBSzFCLEtBQUwsQ0FBV3dDO0FBUGQ7QUFERjtBQTFERixLQURGO0FBd0VEO0FBOUc4QixDQUFsQixDIiwiZmlsZSI6InBhZ2luYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuLy9cbi8vIGltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IGRlZmF1bHRCdXR0b24gPSAocHJvcHMpID0+IChcbiAgPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT0nLWJ0bic+e3Byb3BzLmNoaWxkcmVufTwvYnV0dG9uPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6IHRoaXMucHJvcHMuY3VycmVudFBhZ2VcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2U6IG5leHRQcm9wcy5jdXJyZW50UGFnZX0pXG4gIH0sXG4gIGdldFNhZmVQYWdlIChwYWdlKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBhZ2UsIDApLCB0aGlzLnByb3BzLnBhZ2VzTGVuZ3RoIC0gMSlcbiAgfSxcbiAgY2hhbmdlUGFnZSAocGFnZSkge1xuICAgIHBhZ2UgPSB0aGlzLmdldFNhZmVQYWdlKHBhZ2UpXG4gICAgdGhpcy5zZXRTdGF0ZSh7cGFnZX0pXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShwYWdlKVxuICB9LFxuICBhcHBseVBhZ2UgKGUpIHtcbiAgICBlICYmIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnN0YXRlLnBhZ2VcbiAgICB0aGlzLmNoYW5nZVBhZ2UocGFnZSA9PT0gJycgPyB0aGlzLnByb3BzLmN1cnJlbnRQYWdlIDogcGFnZSlcbiAgfSxcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjdXJyZW50UGFnZSxcbiAgICAgIHBhZ2VzTGVuZ3RoLFxuICAgICAgc2hvd1BhZ2VTaXplT3B0aW9ucyxcbiAgICAgIHBhZ2VTaXplT3B0aW9ucyxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgc2hvd1BhZ2VKdW1wLFxuICAgICAgY2FuUHJldmlvdXMsXG4gICAgICBjYW5OZXh0LFxuICAgICAgb25QYWdlU2l6ZUNoYW5nZVxuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICBjb25zdCBQcmV2aW91c0NvbXBvbmVudCA9IHRoaXMucHJvcHMuUHJldmlvdXNDb21wb25lbnQgfHwgZGVmYXVsdEJ1dHRvblxuICAgIGNvbnN0IE5leHRDb21wb25lbnQgPSB0aGlzLnByb3BzLk5leHRDb21wb25lbnQgfHwgZGVmYXVsdEJ1dHRvblxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRoaXMucHJvcHMucGFnaW5hdGlvbkNsYXNzTmFtZSwgJy1wYWdpbmF0aW9uJyl9XG4gICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnBhZ2luYXRpb25TdHlsZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9Jy1wcmV2aW91cyc+XG4gICAgICAgICAgPFByZXZpb3VzQ29tcG9uZW50XG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWNhblByZXZpb3VzKSByZXR1cm5cbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKGN1cnJlbnRQYWdlIC0gMSlcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhblByZXZpb3VzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZpb3VzVGV4dH1cbiAgICAgICAgICA8L1ByZXZpb3VzQ29tcG9uZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9Jy1jZW50ZXInPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nLXBhZ2VJbmZvJz5cbiAgICAgICAgICAgIFBhZ2Uge3Nob3dQYWdlSnVtcCA/IChcbiAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPSctcGFnZUp1bXAnXG4gICAgICAgICAgICAgICAgb25TdWJtaXQ9e3RoaXMuYXBwbHlQYWdlfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJ3RleHQnIDogJ251bWJlcid9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB2YWwgLSAxXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe3BhZ2U6IHZhbH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTogdGhpcy5nZXRTYWZlUGFnZShwYWdlKX0pXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFnZSA9PT0gJycgPyAnJyA6IHRoaXMuc3RhdGUucGFnZSArIDF9XG4gICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuYXBwbHlQYWdlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9Jy1jdXJyZW50UGFnZSc+e2N1cnJlbnRQYWdlICsgMX08L3NwYW4+XG4gICAgICAgICAgICApfSBvZiA8c3BhbiBjbGFzc05hbWU9Jy10b3RhbFBhZ2VzJz57cGFnZXNMZW5ndGh9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICB7c2hvd1BhZ2VTaXplT3B0aW9ucyAmJiAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NlbGVjdC13cmFwIC1wYWdlU2l6ZU9wdGlvbnMnPlxuICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblBhZ2VTaXplQ2hhbmdlKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtwYWdlU2l6ZU9wdGlvbnMubWFwKChvcHRpb24sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e29wdGlvbn0+XG4gICAgICAgICAgICAgICAgICAgICAge29wdGlvbn0gcm93c1xuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSctbmV4dCc+XG4gICAgICAgICAgPE5leHRDb21wb25lbnRcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghY2FuTmV4dCkgcmV0dXJuXG4gICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZShjdXJyZW50UGFnZSArIDEpXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5OZXh0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRUZXh0fVxuICAgICAgICAgIDwvTmV4dENvbXBvbmVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pXG4iXX0=