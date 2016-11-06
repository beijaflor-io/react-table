'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactTableDefaults = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var ReactTableDefaults = exports.ReactTableDefaults = {
  // General
  data: [],
  loading: false,
  pageSize: 20,
  showPagination: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  showPageJump: true,
  // Callbacks
  onChange: function onChange() {
    return null;
  },
  // Classes
  className: '-striped -highlight',
  tableClassName: 'ReactTable__table',
  theadClassName: 'ReactTable__thread',
  tbodyClassName: 'ReactTable__tbody',
  trClassName: 'ReactTable__tr',
  trClassCallback: function trClassCallback(d) {
    return null;
  },
  thClassName: 'ReactTable__th',
  thGroupClassName: '',
  tdClassName: 'ReactTable__td',
  paginationClassName: '',
  // Styles
  style: {},
  tableStyle: {},
  theadStyle: {},
  tbodyStyle: {},
  trStyle: {},
  trStyleCallback: function trStyleCallback(d) {},
  thStyle: {},
  tdStyle: {},
  paginationStyle: {},
  // Global Column Defaults
  column: {
    sortable: true,
    show: true,
    className: '',
    style: {},
    innerClassName: '',
    innerStyle: {},
    headerClassName: '',
    headerStyle: {},
    headerInnerClassName: '',
    headerInnerStyle: {}
  },
  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  // Components
  tableComponent: function tableComponent(props) {
    return _react2.default.createElement(
      'table',
      props,
      props.children
    );
  },
  theadComponent: function theadComponent(props) {
    return _react2.default.createElement(
      'thead',
      props,
      props.children
    );
  },
  tbodyComponent: function tbodyComponent(props) {
    return _react2.default.createElement(
      'tbody',
      props,
      props.children
    );
  },
  trComponent: function trComponent(props) {
    return _react2.default.createElement(
      'tr',
      props,
      props.children
    );
  },
  thComponent: function thComponent(props) {
    var toggleSort = props.toggleSort,
        rest = _objectWithoutProperties(props, ['toggleSort']);

    return _react2.default.createElement(
      'th',
      _extends({}, rest, { onClick: function onClick(e) {
          toggleSort && toggleSort(e);
        } }),
      props.children
    );
  },
  tdComponent: function tdComponent(props) {
    return _react2.default.createElement(
      'td',
      props,
      props.children
    );
  },
  previousComponent: null,
  nextComponent: null,
  loadingComponent: function loadingComponent(props) {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('-loading', { '-active': props.loading }) },
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        props.loadingText
      )
    );
  }
};

exports.default = _react2.default.createClass({
  displayName: 'src',
  getDefaultProps: function getDefaultProps() {
    return ReactTableDefaults;
  },
  getInitialState: function getInitialState() {
    return {
      page: 0,
      sorting: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.fireOnChange();
  },
  fireOnChange: function fireOnChange() {
    this.props.onChange({
      page: this.getPropOrState('page'),
      pageSize: this.getStateOrProp('pageSize'),
      pages: this.getPagesLength(),
      sorting: this.getSorting()
    }, this);
  },
  getPropOrState: function getPropOrState(key) {
    return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
  },
  getStateOrProp: function getStateOrProp(key) {
    return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
  },
  getInitSorting: function getInitSorting(columns) {
    if (!columns) {
      return [];
    }
    var initSorting = columns.filter(function (d) {
      return typeof d.sort !== 'undefined';
    }).map(function (d) {
      return {
        id: d.id,
        asc: d.sort === 'asc'
      };
    });

    return initSorting.length ? initSorting : [{
      id: columns[0].id,
      asc: true
    }];
  },
  sortData: function sortData(data, sorting) {
    return _utils2.default.orderBy(data, sorting.map(function (sort) {
      return function (row) {
        if (row[sort.id] === null || row[sort.id] === undefined) {
          return -Infinity;
        }
        return typeof row[sort.id] === 'string' ? row[sort.id].toLowerCase() : row[sort.id];
      };
    }), sorting.map(function (d) {
      return d.asc ? 'asc' : 'desc';
    }));
  },
  makeDecoratedColumn: function makeDecoratedColumn(column) {
    var dcol = Object.assign({}, this.props.column, column);

    if (typeof dcol.accessor === 'string') {
      var _ret = function () {
        dcol.id = dcol.id || dcol.accessor;
        var accessorString = dcol.accessor;
        dcol.accessor = function (row) {
          return _utils2.default.get(row, accessorString);
        };
        return {
          v: dcol
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    if (dcol.accessor && !dcol.id) {
      console.warn(dcol);
      throw new Error('A column id is required if using a non-string accessor for column above.');
    }

    if (!dcol.accessor) {
      dcol.accessor = function (d) {
        return undefined;
      };
    }

    return dcol;
  },
  getSorting: function getSorting(columns) {
    return this.props.sorting || (this.state.sorting && this.state.sorting.length ? this.state.sorting : this.getInitSorting(columns));
  },
  getPagesLength: function getPagesLength() {
    return this.props.manual ? this.props.pages : Math.ceil(this.props.data.length / this.getStateOrProp('pageSize'));
  },
  getMinRows: function getMinRows() {
    return _utils2.default.getFirstDefined(this.props.minRows, this.props.pageSize);
  },
  render: function render() {
    var _this = this;

    // Build Columns
    var decoratedColumns = [];
    var headerGroups = [];
    var currentSpan = [];

    // Determine Header Groups
    var hasHeaderGroups = false;
    this.props.columns.forEach(function (column) {
      if (column.columns) {
        hasHeaderGroups = true;
      }
    });

    // A convenience function to add a header and reset the currentSpan
    var addHeader = function addHeader(columns) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      headerGroups.push(Object.assign({}, column, {
        columns: columns
      }));
      currentSpan = [];
    };

    // Build the columns and headers
    var visibleColumns = this.props.columns.filter(function (d) {
      return _utils2.default.getFirstDefined(d.show, true);
    });
    visibleColumns.forEach(function (column, i) {
      if (column.columns) {
        var nestedColumns = column.columns.filter(function (d) {
          return _utils2.default.getFirstDefined(d.show, true);
        });
        nestedColumns.forEach(function (nestedColumn) {
          decoratedColumns.push(_this.makeDecoratedColumn(nestedColumn));
        });
        if (hasHeaderGroups) {
          if (currentSpan.length > 0) {
            addHeader(currentSpan);
          }
          addHeader(_utils2.default.takeRight(decoratedColumns, nestedColumns.length), column);
        }
      } else {
        decoratedColumns.push(_this.makeDecoratedColumn(column));
        currentSpan.push(_utils2.default.last(decoratedColumns));
      }
    });

    if (hasHeaderGroups && currentSpan.length > 0) {
      addHeader(currentSpan);
    }

    var sorting = this.getSorting(decoratedColumns);
    var accessedData = this.props.data.map(function (d, i) {
      var row = {
        __original: d,
        __index: i
      };
      decoratedColumns.forEach(function (column) {
        row[column.id] = column.accessor(d);
      });
      return row;
    });
    var data = this.props.manual ? accessedData : this.sortData(accessedData, sorting);

    // Normalize state
    var currentPage = this.getPropOrState('page');
    var pageSize = this.getStateOrProp('pageSize');
    var pagesLength = this.getPagesLength();

    // Pagination
    var startRow = pageSize * currentPage;
    var endRow = startRow + pageSize;
    var pageRows = this.props.manual ? data : data.slice(startRow, endRow);
    var minRows = this.getMinRows();
    var padRows = pagesLength > 1 ? _utils2.default.range(pageSize - pageRows.length) : minRows ? _utils2.default.range(Math.max(minRows - pageRows.length, 0)) : [];

    var canPrevious = currentPage > 0;
    var canNext = currentPage + 1 < pagesLength;

    var TableComponent = this.props.tableComponent;
    var TheadComponent = this.props.theadComponent;
    var TbodyComponent = this.props.tbodyComponent;
    var TrComponent = this.props.trComponent;
    var ThComponent = this.props.thComponent;
    var TdComponent = this.props.tdComponent;
    var PreviousComponent = this.props.previousComponent;
    var NextComponent = this.props.nextComponent;
    var LoadingComponent = this.props.loadingComponent;

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.props.className, 'ReactTable'),
        style: this.props.style
      },
      _react2.default.createElement(
        TableComponent,
        {
          className: (0, _classnames2.default)(this.props.tableClassName),
          style: this.props.tableStyle
        },
        hasHeaderGroups && _react2.default.createElement(
          TheadComponent,
          {
            className: (0, _classnames2.default)(this.props.theadGroupClassName, '-headerGroups'),
            style: this.props.theadStyle
          },
          _react2.default.createElement(
            TrComponent,
            {
              className: this.props.trClassName,
              style: this.props.trStyle
            },
            headerGroups.map(function (column, i) {
              return _react2.default.createElement(
                ThComponent,
                {
                  key: i,
                  colSpan: column.columns.length,
                  className: (0, _classnames2.default)(_this.props.thClassname, column.headerClassName),
                  style: Object.assign({}, _this.props.thStyle, column.headerStyle)
                },
                _react2.default.createElement(
                  'div',
                  {
                    className: (0, _classnames2.default)(column.headerInnerClassName, '-th-inner'),
                    style: Object.assign({}, _this.props.thInnerStyle, column.headerInnerStyle)
                  },
                  typeof column.header === 'function' ? _react2.default.createElement(column.header, {
                    data: _this.props.data,
                    column: column
                  }) : column.header
                )
              );
            })
          )
        ),
        _react2.default.createElement(
          TheadComponent,
          {
            className: (0, _classnames2.default)(this.props.theadClassName),
            style: this.props.theadStyle
          },
          _react2.default.createElement(
            TrComponent,
            {
              className: this.props.trClassName,
              style: this.props.trStyle
            },
            decoratedColumns.map(function (column, i) {
              var sort = sorting.find(function (d) {
                return d.id === column.id;
              });
              var show = typeof column.show === 'function' ? column.show() : column.show;
              return _react2.default.createElement(
                ThComponent,
                {
                  key: i,
                  className: (0, _classnames2.default)(_this.props.thClassname, column.headerClassName, sort ? sort.asc ? '-sort-asc' : '-sort-desc' : '', {
                    '-cursor-pointer': column.sortable,
                    '-hidden': !show
                  }),
                  style: Object.assign({}, _this.props.thStyle, column.headerStyle),
                  toggleSort: function toggleSort(e) {
                    column.sortable && _this.sortColumn(column, e.shiftKey);
                  }
                },
                _react2.default.createElement(
                  'div',
                  {
                    className: (0, _classnames2.default)(column.headerInnerClassName, '-th-inner'),
                    style: Object.assign({}, column.headerInnerStyle, {
                      minWidth: column.minWidth + 'px'
                    })
                  },
                  typeof column.header === 'function' ? _react2.default.createElement(column.header, {
                    data: _this.props.data,
                    column: column
                  }) : column.header
                )
              );
            })
          )
        ),
        _react2.default.createElement(
          TbodyComponent,
          {
            className: (0, _classnames2.default)(this.props.tbodyClassName),
            style: this.props.tbodyStyle
          },
          pageRows.map(function (row, i) {
            var rowInfo = {
              row: row.__original,
              rowValues: row,
              index: row.__index,
              viewIndex: i
            };
            return _react2.default.createElement(
              TrComponent,
              {
                key: i,
                className: (0, _classnames2.default)(_this.props.trClassName, _this.props.trClassCallback(rowInfo)),
                style: Object.assign({}, _this.props.trStyle, _this.props.trStyleCallback(rowInfo))
              },
              decoratedColumns.map(function (column, i2) {
                var Cell = column.render;
                var show = typeof column.show === 'function' ? column.show() : column.show;
                return _react2.default.createElement(
                  TdComponent,
                  {
                    key: i2,
                    className: (0, _classnames2.default)(column.className, { hidden: !show }),
                    style: Object.assign({}, _this.props.tdStyle, column.style)
                  },
                  _react2.default.createElement(
                    'div',
                    {
                      className: (0, _classnames2.default)(column.innerClassName, '-td-inner'),
                      style: Object.assign({}, column.innerStyle, {
                        minWidth: column.minWidth + 'px'
                      })
                    },
                    typeof Cell === 'function' ? _react2.default.createElement(Cell, _extends({}, rowInfo, {
                      value: rowInfo.rowValues[column.id]
                    })) : typeof Cell !== 'undefined' ? Cell : rowInfo.rowValues[column.id]
                  )
                );
              })
            );
          }),
          padRows.map(function (row, i) {
            return _react2.default.createElement(
              TrComponent,
              {
                key: i,
                className: (0, _classnames2.default)(_this.props.trClassName, '-padRow'),
                style: _this.props.trStyle
              },
              decoratedColumns.map(function (column, i2) {
                var show = typeof column.show === 'function' ? column.show() : column.show;
                return _react2.default.createElement(
                  TdComponent,
                  {
                    key: i2,
                    className: (0, _classnames2.default)(column.className, { hidden: !show }),
                    style: Object.assign({}, _this.props.tdStyle, column.style)
                  },
                  _react2.default.createElement(
                    'div',
                    {
                      className: (0, _classnames2.default)(column.innerClassName, '-td-inner'),
                      style: Object.assign({}, column.innerStyle, {
                        minWidth: column.minWidth + 'px'
                      })
                    },
                    '\xA0'
                  )
                );
              })
            );
          })
        )
      ),
      this.props.showPagination && _react2.default.createElement(_pagination2.default, {
        currentPage: currentPage,
        pagesLength: pagesLength,
        pageSize: pageSize,
        showPageSizeOptions: this.props.showPageSizeOptions,
        pageSizeOptions: this.props.pageSizeOptions,
        showPageJump: this.props.showPageJump,
        canPrevious: canPrevious,
        canNext: canNext,
        previousText: this.props.previousText,
        nextText: this.props.nextText,
        previousComponent: PreviousComponent,
        nextComponent: NextComponent
        //
        , onChange: this.setPage,
        onPageSizeChange: this.setPageSize
      }),
      _react2.default.createElement(LoadingComponent, this.props)
    );
  },

  // User actions
  setPage: function setPage(page) {
    var _this2 = this;

    this.setState({
      page: page
    }, function () {
      _this2.fireOnChange();
    });
  },
  setPageSize: function setPageSize(pageSize) {
    var _this3 = this;

    var currentPageSize = this.getStateOrProp('pageSize');
    var currentPage = this.getPropOrState('page');
    var currentRow = currentPageSize * currentPage;
    var page = Math.floor(currentRow / pageSize);
    this.setState({
      pageSize: pageSize,
      page: page
    }, function () {
      _this3.fireOnChange();
    });
  },
  sortColumn: function sortColumn(column, additive) {
    var _this4 = this;

    var existingSorting = this.getSorting();
    var sorting = _utils2.default.clone(this.state.sorting || []);
    var existingIndex = sorting.findIndex(function (d) {
      return d.id === column.id;
    });
    if (existingIndex > -1) {
      var existing = sorting[existingIndex];
      if (existing.asc) {
        existing.asc = false;
        if (!additive) {
          sorting = [existing];
        }
      } else {
        if (additive) {
          sorting.splice(existingIndex, 1);
        } else {
          existing.asc = true;
          sorting = [existing];
        }
      }
    } else {
      if (additive) {
        sorting.push({
          id: column.id,
          asc: true
        });
      } else {
        sorting = [{
          id: column.id,
          asc: true
        }];
      }
    }
    var page = existingIndex === 0 || !existingSorting.length && sorting.length || !additive ? 0 : this.state.page;
    this.setState({
      page: page,
      sorting: sorting
    }, function () {
      _this4.fireOnChange();
    });
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdFRhYmxlRGVmYXVsdHMiLCJkYXRhIiwibG9hZGluZyIsInBhZ2VTaXplIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnZVNpemVPcHRpb25zIiwicGFnZVNpemVPcHRpb25zIiwic2hvd1BhZ2VKdW1wIiwib25DaGFuZ2UiLCJjbGFzc05hbWUiLCJ0YWJsZUNsYXNzTmFtZSIsInRoZWFkQ2xhc3NOYW1lIiwidGJvZHlDbGFzc05hbWUiLCJ0ckNsYXNzTmFtZSIsInRyQ2xhc3NDYWxsYmFjayIsInRoQ2xhc3NOYW1lIiwidGhHcm91cENsYXNzTmFtZSIsInRkQ2xhc3NOYW1lIiwicGFnaW5hdGlvbkNsYXNzTmFtZSIsInN0eWxlIiwidGFibGVTdHlsZSIsInRoZWFkU3R5bGUiLCJ0Ym9keVN0eWxlIiwidHJTdHlsZSIsInRyU3R5bGVDYWxsYmFjayIsInRoU3R5bGUiLCJ0ZFN0eWxlIiwicGFnaW5hdGlvblN0eWxlIiwiY29sdW1uIiwic29ydGFibGUiLCJzaG93IiwiaW5uZXJDbGFzc05hbWUiLCJpbm5lclN0eWxlIiwiaGVhZGVyQ2xhc3NOYW1lIiwiaGVhZGVyU3R5bGUiLCJoZWFkZXJJbm5lckNsYXNzTmFtZSIsImhlYWRlcklubmVyU3R5bGUiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0IiwidGFibGVDb21wb25lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwidGhlYWRDb21wb25lbnQiLCJ0Ym9keUNvbXBvbmVudCIsInRyQ29tcG9uZW50IiwidGhDb21wb25lbnQiLCJ0b2dnbGVTb3J0IiwicmVzdCIsImUiLCJ0ZENvbXBvbmVudCIsInByZXZpb3VzQ29tcG9uZW50IiwibmV4dENvbXBvbmVudCIsImxvYWRpbmdDb21wb25lbnQiLCJjcmVhdGVDbGFzcyIsImdldERlZmF1bHRQcm9wcyIsImdldEluaXRpYWxTdGF0ZSIsInBhZ2UiLCJzb3J0aW5nIiwiY29tcG9uZW50RGlkTW91bnQiLCJmaXJlT25DaGFuZ2UiLCJnZXRQcm9wT3JTdGF0ZSIsImdldFN0YXRlT3JQcm9wIiwicGFnZXMiLCJnZXRQYWdlc0xlbmd0aCIsImdldFNvcnRpbmciLCJrZXkiLCJnZXRGaXJzdERlZmluZWQiLCJzdGF0ZSIsImdldEluaXRTb3J0aW5nIiwiY29sdW1ucyIsImluaXRTb3J0aW5nIiwiZmlsdGVyIiwiZCIsInNvcnQiLCJtYXAiLCJpZCIsImFzYyIsImxlbmd0aCIsInNvcnREYXRhIiwib3JkZXJCeSIsInJvdyIsInVuZGVmaW5lZCIsIkluZmluaXR5IiwidG9Mb3dlckNhc2UiLCJtYWtlRGVjb3JhdGVkQ29sdW1uIiwiZGNvbCIsIk9iamVjdCIsImFzc2lnbiIsImFjY2Vzc29yIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwibWFudWFsIiwiTWF0aCIsImNlaWwiLCJnZXRNaW5Sb3dzIiwibWluUm93cyIsInJlbmRlciIsImRlY29yYXRlZENvbHVtbnMiLCJoZWFkZXJHcm91cHMiLCJjdXJyZW50U3BhbiIsImhhc0hlYWRlckdyb3VwcyIsImZvckVhY2giLCJhZGRIZWFkZXIiLCJwdXNoIiwidmlzaWJsZUNvbHVtbnMiLCJpIiwibmVzdGVkQ29sdW1ucyIsIm5lc3RlZENvbHVtbiIsInRha2VSaWdodCIsImxhc3QiLCJhY2Nlc3NlZERhdGEiLCJfX29yaWdpbmFsIiwiX19pbmRleCIsImN1cnJlbnRQYWdlIiwicGFnZXNMZW5ndGgiLCJzdGFydFJvdyIsImVuZFJvdyIsInBhZ2VSb3dzIiwic2xpY2UiLCJwYWRSb3dzIiwicmFuZ2UiLCJtYXgiLCJjYW5QcmV2aW91cyIsImNhbk5leHQiLCJUYWJsZUNvbXBvbmVudCIsIlRoZWFkQ29tcG9uZW50IiwiVGJvZHlDb21wb25lbnQiLCJUckNvbXBvbmVudCIsIlRoQ29tcG9uZW50IiwiVGRDb21wb25lbnQiLCJQcmV2aW91c0NvbXBvbmVudCIsIk5leHRDb21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwidGhlYWRHcm91cENsYXNzTmFtZSIsInRoQ2xhc3NuYW1lIiwidGhJbm5lclN0eWxlIiwiaGVhZGVyIiwiZmluZCIsInNvcnRDb2x1bW4iLCJzaGlmdEtleSIsIm1pbldpZHRoIiwicm93SW5mbyIsInJvd1ZhbHVlcyIsImluZGV4Iiwidmlld0luZGV4IiwiaTIiLCJDZWxsIiwiaGlkZGVuIiwic2V0UGFnZSIsInNldFBhZ2VTaXplIiwic2V0U3RhdGUiLCJjdXJyZW50UGFnZVNpemUiLCJjdXJyZW50Um93IiwiZmxvb3IiLCJhZGRpdGl2ZSIsImV4aXN0aW5nU29ydGluZyIsImNsb25lIiwiZXhpc3RpbmdJbmRleCIsImZpbmRJbmRleCIsImV4aXN0aW5nIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7O0FBSEE7OztBQUtPLElBQU1BLGtEQUFxQjtBQUNoQztBQUNBQyxRQUFNLEVBRjBCO0FBR2hDQyxXQUFTLEtBSHVCO0FBSWhDQyxZQUFVLEVBSnNCO0FBS2hDQyxrQkFBZ0IsSUFMZ0I7QUFNaENDLHVCQUFxQixJQU5XO0FBT2hDQyxtQkFBaUIsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEdBQXBCLENBUGU7QUFRaENDLGdCQUFjLElBUmtCO0FBU2hDO0FBQ0FDLFlBQVU7QUFBQSxXQUFNLElBQU47QUFBQSxHQVZzQjtBQVdoQztBQUNBQyxhQUFXLHFCQVpxQjtBQWFoQ0Msa0JBQWdCLG1CQWJnQjtBQWNoQ0Msa0JBQWdCLG9CQWRnQjtBQWVoQ0Msa0JBQWdCLG1CQWZnQjtBQWdCaENDLGVBQWEsZ0JBaEJtQjtBQWlCaENDLG1CQUFpQjtBQUFBLFdBQUssSUFBTDtBQUFBLEdBakJlO0FBa0JoQ0MsZUFBYSxnQkFsQm1CO0FBbUJoQ0Msb0JBQWtCLEVBbkJjO0FBb0JoQ0MsZUFBYSxnQkFwQm1CO0FBcUJoQ0MsdUJBQXFCLEVBckJXO0FBc0JoQztB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RUFBa0I7QUFDaEJzRixpQkFBU3RGLEdBQVQsR0FBZSxLQUFmO0FBQ0EsWUFBSSxDQUFDaUYsUUFBTCxFQUFlO0FBQ2JwRyxvQkFBVSxDQUFDeUcsUUFBRCxDQUFWO0FBQ0Q7QUFDRixPQUxELE1BS087QUFDTCxZQUFJTCxRQUFKLEVBQWM7QUFDWnBHLGtCQUFRMEcsTUFBUixDQUFlSCxhQUFmLEVBQThCLENBQTlCO0FBQ0QsU0FGRCxNQUVPO0FBQ0xFLG1CQUFTdEYsR0FBVCxHQUFlLElBQWY7QUFDQW5CLG9CQUFVLENBQUN5RyxRQUFELENBQVY7QUFDRDtBQUNGO0FBQ0YsS0FmRCxNQWVPO0FBQ0wsVUFBSUwsUUFBSixFQUFjO0FBQ1pwRyxnQkFBUWlELElBQVIsQ0FBYTtBQUNYL0IsY0FBSWhELE9BQU9nRCxFQURBO0FBRVhDLGVBQUs7QUFGTSxTQUFiO0FBSUQsT0FMRCxNQUtPO0FBQ0xuQixrQkFBVSxDQUFDO0FBQ1RrQixjQUFJaEQsT0FBT2dELEVBREY7QUFFVEMsZUFBSztBQUZJLFNBQUQsQ0FBVjtBQUlEO0FBQ0Y7QUFDRCxRQUFNcEIsT0FBUXdHLGtCQUFrQixDQUFsQixJQUF3QixDQUFDRixnQkFBZ0JqRixNQUFqQixJQUEyQnBCLFFBQVFvQixNQUEzRCxJQUFzRSxDQUFDZ0YsUUFBeEUsR0FBb0YsQ0FBcEYsR0FBd0YsS0FBSzFGLEtBQUwsQ0FBV1gsSUFBaEg7QUFDQSxTQUFLaUcsUUFBTCxDQUFjO0FBQ1pqRyxnQkFEWTtBQUVaQztBQUZZLEtBQWQsRUFHRyxZQUFNO0FBQ1AsYUFBS0UsWUFBTDtBQUNELEtBTEQ7QUFNRDtBQW5hOEIsQ0FBbEIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG4vL1xuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcblxuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xuXG5leHBvcnQgY29uc3QgUmVhY3RUYWJsZURlZmF1bHRzID0ge1xuICAvLyBHZW5lcmFsXG4gIGRhdGE6IFtdLFxuICBsb2FkaW5nOiBmYWxzZSxcbiAgcGFnZVNpemU6IDIwLFxuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcbiAgcGFnZVNpemVPcHRpb25zOiBbNSwgMTAsIDIwLCAyNSwgNTAsIDEwMF0sXG4gIHNob3dQYWdlSnVtcDogdHJ1ZSxcbiAgLy8gQ2FsbGJhY2tzXG4gIG9uQ2hhbmdlOiAoKSA9PiBudWxsLFxuICAvLyBDbGFzc2VzXG4gIGNsYXNzTmFtZTogJy1zdHJpcGVkIC1oaWdobGlnaHQnLFxuICB0YWJsZUNsYXNzTmFtZTogJ1JlYWN0VGFibGVfX3RhYmxlJyxcbiAgdGhlYWRDbGFzc05hbWU6ICdSZWFjdFRhYmxlX190aHJlYWQnLFxuICB0Ym9keUNsYXNzTmFtZTogJ1JlYWN0VGFibGVfX3Rib2R5JyxcbiAgdHJDbGFzc05hbWU6ICdSZWFjdFRhYmxlX190cicsXG4gIHRyQ2xhc3NDYWxsYmFjazogZCA9PiBudWxsLFxuICB0aENsYXNzTmFtZTogJ1JlYWN0VGFibGVfX3RoJyxcbiAgdGhHcm91cENsYXNzTmFtZTogJycsXG4gIHRkQ2xhc3NOYW1lOiAnUmVhY3RUYWJsZV9fdGQnLFxuICBwYWdpbmF0aW9uQ2xhc3NOYW1lOiAnJyxcbiAgLy8gU3R5bGVzXG4gIHN0eWxlOiB7fSxcbiAgdGFibGVTdHlsZToge30sXG4gIHRoZWFkU3R5bGU6IHt9LFxuICB0Ym9keVN0eWxlOiB7fSxcbiAgdHJTdHlsZToge30sXG4gIHRyU3R5bGVDYWxsYmFjazogZCA9PiB7fSxcbiAgdGhTdHlsZToge30sXG4gIHRkU3R5bGU6IHt9LFxuICBwYWdpbmF0aW9uU3R5bGU6IHt9LFxuICAvLyBHbG9iYWwgQ29sdW1uIERlZmF1bHRzXG4gIGNvbHVtbjoge1xuICAgIHNvcnRhYmxlOiB0cnVlLFxuICAgIHNob3c6IHRydWUsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBzdHlsZToge30sXG4gICAgaW5uZXJDbGFzc05hbWU6ICcnLFxuICAgIGlubmVyU3R5bGU6IHt9LFxuICAgIGhlYWRlckNsYXNzTmFtZTogJycsXG4gICAgaGVhZGVyU3R5bGU6IHt9LFxuICAgIGhlYWRlcklubmVyQ2xhc3NOYW1lOiAnJyxcbiAgICBoZWFkZXJJbm5lclN0eWxlOiB7fVxuICB9LFxuICAvLyBUZXh0XG4gIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcbiAgbmV4dFRleHQ6ICdOZXh0JyxcbiAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcbiAgLy8gQ29tcG9uZW50c1xuICB0YWJsZUNvbXBvbmVudDogKHByb3BzKSA9PiA8dGFibGUgey4uLnByb3BzfT57cHJvcHMuY2hpbGRyZW59PC90YWJsZT4sXG4gIHRoZWFkQ29tcG9uZW50OiAocHJvcHMpID0+IDx0aGVhZCB7Li4ucHJvcHN9Pntwcm9wcy5jaGlsZHJlbn08L3RoZWFkPixcbiAgdGJvZHlDb21wb25lbnQ6IChwcm9wcykgPT4gPHRib2R5IHsuLi5wcm9wc30+e3Byb3BzLmNoaWxkcmVufTwvdGJvZHk+LFxuICB0ckNvbXBvbmVudDogKHByb3BzKSA9PiA8dHIgey4uLnByb3BzfT57cHJvcHMuY2hpbGRyZW59PC90cj4sXG4gIHRoQ29tcG9uZW50OiAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7dG9nZ2xlU29ydCwgLi4ucmVzdH0gPSBwcm9wc1xuICAgIHJldHVybiAoXG4gICAgICA8dGggey4uLnJlc3R9IG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICB0b2dnbGVTb3J0ICYmIHRvZ2dsZVNvcnQoZSlcbiAgICAgIH19Pntwcm9wcy5jaGlsZHJlbn08L3RoPlxuICAgIClcbiAgfSxcbiAgdGRDb21wb25lbnQ6IChwcm9wcykgPT4gPHRkIHsuLi5wcm9wc30+e3Byb3BzLmNoaWxkcmVufTwvdGQ+LFxuICBwcmV2aW91c0NvbXBvbmVudDogbnVsbCxcbiAgbmV4dENvbXBvbmVudDogbnVsbCxcbiAgbG9hZGluZ0NvbXBvbmVudDogcHJvcHMgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctbG9hZGluZycsIHsnLWFjdGl2ZSc6IHByb3BzLmxvYWRpbmd9KX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nLWxvYWRpbmctaW5uZXInPlxuICAgICAgICB7cHJvcHMubG9hZGluZ1RleHR9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldERlZmF1bHRQcm9wcyAoKSB7XG4gICAgcmV0dXJuIFJlYWN0VGFibGVEZWZhdWx0c1xuICB9LFxuICBnZXRJbml0aWFsU3RhdGUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiAwLFxuICAgICAgc29ydGluZzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLmZpcmVPbkNoYW5nZSgpXG4gIH0sXG4gIGZpcmVPbkNoYW5nZSAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XG4gICAgICBwYWdlOiB0aGlzLmdldFByb3BPclN0YXRlKCdwYWdlJyksXG4gICAgICBwYWdlU2l6ZTogdGhpcy5nZXRTdGF0ZU9yUHJvcCgncGFnZVNpemUnKSxcbiAgICAgIHBhZ2VzOiB0aGlzLmdldFBhZ2VzTGVuZ3RoKCksXG4gICAgICBzb3J0aW5nOiB0aGlzLmdldFNvcnRpbmcoKVxuICAgIH0sIHRoaXMpXG4gIH0sXG4gIGdldFByb3BPclN0YXRlIChrZXkpIHtcbiAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wc1trZXldLCB0aGlzLnN0YXRlW2tleV0pXG4gIH0sXG4gIGdldFN0YXRlT3JQcm9wIChrZXkpIHtcbiAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5zdGF0ZVtrZXldLCB0aGlzLnByb3BzW2tleV0pXG4gIH0sXG4gIGdldEluaXRTb3J0aW5nIChjb2x1bW5zKSB7XG4gICAgaWYgKCFjb2x1bW5zKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgY29uc3QgaW5pdFNvcnRpbmcgPSBjb2x1bW5zLmZpbHRlcihkID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YgZC5zb3J0ICE9PSAndW5kZWZpbmVkJ1xuICAgIH0pLm1hcChkID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBkLmlkLFxuICAgICAgICBhc2M6IGQuc29ydCA9PT0gJ2FzYydcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGluaXRTb3J0aW5nLmxlbmd0aCA/IGluaXRTb3J0aW5nIDogW3tcbiAgICAgIGlkOiBjb2x1bW5zWzBdLmlkLFxuICAgICAgYXNjOiB0cnVlXG4gICAgfV1cbiAgfSxcbiAgc29ydERhdGEgKGRhdGEsIHNvcnRpbmcpIHtcbiAgICByZXR1cm4gXy5vcmRlckJ5KGRhdGEsIHNvcnRpbmcubWFwKHNvcnQgPT4ge1xuICAgICAgcmV0dXJuIHJvdyA9PiB7XG4gICAgICAgIGlmIChyb3dbc29ydC5pZF0gPT09IG51bGwgfHwgcm93W3NvcnQuaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gLUluZmluaXR5XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiByb3dbc29ydC5pZF0gPT09ICdzdHJpbmcnID8gcm93W3NvcnQuaWRdLnRvTG93ZXJDYXNlKCkgOiByb3dbc29ydC5pZF1cbiAgICAgIH1cbiAgICB9KSwgc29ydGluZy5tYXAoZCA9PiBkLmFzYyA/ICdhc2MnIDogJ2Rlc2MnKSlcbiAgfSxcbiAgbWFrZURlY29yYXRlZENvbHVtbiAoY29sdW1uKSB7XG4gICAgY29uc3QgZGNvbCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuY29sdW1uLCBjb2x1bW4pXG5cbiAgICBpZiAodHlwZW9mIGRjb2wuYWNjZXNzb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkY29sLmlkID0gZGNvbC5pZCB8fCBkY29sLmFjY2Vzc29yXG4gICAgICBjb25zdCBhY2Nlc3NvclN0cmluZyA9IGRjb2wuYWNjZXNzb3JcbiAgICAgIGRjb2wuYWNjZXNzb3IgPSByb3cgPT4gXy5nZXQocm93LCBhY2Nlc3NvclN0cmluZylcbiAgICAgIHJldHVybiBkY29sXG4gICAgfVxuXG4gICAgaWYgKGRjb2wuYWNjZXNzb3IgJiYgIWRjb2wuaWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihkY29sKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGNvbHVtbiBpZCBpcyByZXF1aXJlZCBpZiB1c2luZyBhIG5vbi1zdHJpbmcgYWNjZXNzb3IgZm9yIGNvbHVtbiBhYm92ZS4nKVxuICAgIH1cblxuICAgIGlmICghZGNvbC5hY2Nlc3Nvcikge1xuICAgICAgZGNvbC5hY2Nlc3NvciA9IGQgPT4gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgcmV0dXJuIGRjb2xcbiAgfSxcbiAgZ2V0U29ydGluZyAoY29sdW1ucykge1xuICAgIHJldHVybiB0aGlzLnByb3BzLnNvcnRpbmcgfHwgKHRoaXMuc3RhdGUuc29ydGluZyAmJiB0aGlzLnN0YXRlLnNvcnRpbmcubGVuZ3RoID8gdGhpcy5zdGF0ZS5zb3J0aW5nIDogdGhpcy5nZXRJbml0U29ydGluZyhjb2x1bW5zKSlcbiAgfSxcbiAgZ2V0UGFnZXNMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1hbnVhbCA/IHRoaXMucHJvcHMucGFnZXNcbiAgICAgIDogTWF0aC5jZWlsKHRoaXMucHJvcHMuZGF0YS5sZW5ndGggLyB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlU2l6ZScpKVxuICB9LFxuICBnZXRNaW5Sb3dzICgpIHtcbiAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wcy5taW5Sb3dzLCB0aGlzLnByb3BzLnBhZ2VTaXplKVxuICB9LFxuICByZW5kZXIgKCkge1xuICAgIC8vIEJ1aWxkIENvbHVtbnNcbiAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gW11cbiAgICBjb25zdCBoZWFkZXJHcm91cHMgPSBbXVxuICAgIGxldCBjdXJyZW50U3BhbiA9IFtdXG5cbiAgICAvLyBEZXRlcm1pbmUgSGVhZGVyIEdyb3Vwc1xuICAgIGxldCBoYXNIZWFkZXJHcm91cHMgPSBmYWxzZVxuICAgIHRoaXMucHJvcHMuY29sdW1uc1xuICAgIC5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgaGFzSGVhZGVyR3JvdXBzID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBBIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGFkZCBhIGhlYWRlciBhbmQgcmVzZXQgdGhlIGN1cnJlbnRTcGFuXG4gICAgY29uc3QgYWRkSGVhZGVyID0gKGNvbHVtbnMsIGNvbHVtbiA9IHt9KSA9PiB7XG4gICAgICBoZWFkZXJHcm91cHMucHVzaChPYmplY3QuYXNzaWduKHt9LCBjb2x1bW4sIHtcbiAgICAgICAgY29sdW1uczogY29sdW1uc1xuICAgICAgfSkpXG4gICAgICBjdXJyZW50U3BhbiA9IFtdXG4gICAgfVxuXG4gICAgLy8gQnVpbGQgdGhlIGNvbHVtbnMgYW5kIGhlYWRlcnNcbiAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IHRoaXMucHJvcHMuY29sdW1ucy5maWx0ZXIoZCA9PiBfLmdldEZpcnN0RGVmaW5lZChkLnNob3csIHRydWUpKVxuICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IG5lc3RlZENvbHVtbnMgPSBjb2x1bW4uY29sdW1ucy5maWx0ZXIoZCA9PiBfLmdldEZpcnN0RGVmaW5lZChkLnNob3csIHRydWUpKVxuICAgICAgICBuZXN0ZWRDb2x1bW5zLmZvckVhY2gobmVzdGVkQ29sdW1uID0+IHtcbiAgICAgICAgICBkZWNvcmF0ZWRDb2x1bW5zLnB1c2godGhpcy5tYWtlRGVjb3JhdGVkQ29sdW1uKG5lc3RlZENvbHVtbikpXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChoYXNIZWFkZXJHcm91cHMpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFNwYW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRIZWFkZXIoXy50YWtlUmlnaHQoZGVjb3JhdGVkQ29sdW1ucywgbmVzdGVkQ29sdW1ucy5sZW5ndGgpLCBjb2x1bW4pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlY29yYXRlZENvbHVtbnMucHVzaCh0aGlzLm1ha2VEZWNvcmF0ZWRDb2x1bW4oY29sdW1uKSlcbiAgICAgICAgY3VycmVudFNwYW4ucHVzaChfLmxhc3QoZGVjb3JhdGVkQ29sdW1ucykpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChoYXNIZWFkZXJHcm91cHMgJiYgY3VycmVudFNwYW4ubGVuZ3RoID4gMCkge1xuICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRpbmcgPSB0aGlzLmdldFNvcnRpbmcoZGVjb3JhdGVkQ29sdW1ucylcbiAgICBjb25zdCBhY2Nlc3NlZERhdGEgPSB0aGlzLnByb3BzLmRhdGEubWFwKChkLCBpKSA9PiB7XG4gICAgICBjb25zdCByb3cgPSB7XG4gICAgICAgIF9fb3JpZ2luYWw6IGQsXG4gICAgICAgIF9faW5kZXg6IGlcbiAgICAgIH1cbiAgICAgIGRlY29yYXRlZENvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxuICAgICAgfSlcbiAgICAgIHJldHVybiByb3dcbiAgICB9KVxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByb3BzLm1hbnVhbCA/IGFjY2Vzc2VkRGF0YSA6IHRoaXMuc29ydERhdGEoYWNjZXNzZWREYXRhLCBzb3J0aW5nKVxuXG4gICAgLy8gTm9ybWFsaXplIHN0YXRlXG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSB0aGlzLmdldFByb3BPclN0YXRlKCdwYWdlJylcbiAgICBjb25zdCBwYWdlU2l6ZSA9IHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJylcbiAgICBjb25zdCBwYWdlc0xlbmd0aCA9IHRoaXMuZ2V0UGFnZXNMZW5ndGgoKVxuXG4gICAgLy8gUGFnaW5hdGlvblxuICAgIGNvbnN0IHN0YXJ0Um93ID0gcGFnZVNpemUgKiBjdXJyZW50UGFnZVxuICAgIGNvbnN0IGVuZFJvdyA9IHN0YXJ0Um93ICsgcGFnZVNpemVcbiAgICBjb25zdCBwYWdlUm93cyA9IHRoaXMucHJvcHMubWFudWFsID8gZGF0YSA6IGRhdGEuc2xpY2Uoc3RhcnRSb3csIGVuZFJvdylcbiAgICBjb25zdCBtaW5Sb3dzID0gdGhpcy5nZXRNaW5Sb3dzKClcbiAgICBjb25zdCBwYWRSb3dzID0gcGFnZXNMZW5ndGggPiAxID8gXy5yYW5nZShwYWdlU2l6ZSAtIHBhZ2VSb3dzLmxlbmd0aClcbiAgICAgIDogbWluUm93cyA/IF8ucmFuZ2UoTWF0aC5tYXgobWluUm93cyAtIHBhZ2VSb3dzLmxlbmd0aCwgMCkpXG4gICAgICA6IFtdXG5cbiAgICBjb25zdCBjYW5QcmV2aW91cyA9IGN1cnJlbnRQYWdlID4gMFxuICAgIGNvbnN0IGNhbk5leHQgPSBjdXJyZW50UGFnZSArIDEgPCBwYWdlc0xlbmd0aFxuXG4gICAgY29uc3QgVGFibGVDb21wb25lbnQgPSB0aGlzLnByb3BzLnRhYmxlQ29tcG9uZW50XG4gICAgY29uc3QgVGhlYWRDb21wb25lbnQgPSB0aGlzLnByb3BzLnRoZWFkQ29tcG9uZW50XG4gICAgY29uc3QgVGJvZHlDb21wb25lbnQgPSB0aGlzLnByb3BzLnRib2R5Q29tcG9uZW50XG4gICAgY29uc3QgVHJDb21wb25lbnQgPSB0aGlzLnByb3BzLnRyQ29tcG9uZW50XG4gICAgY29uc3QgVGhDb21wb25lbnQgPSB0aGlzLnByb3BzLnRoQ29tcG9uZW50XG4gICAgY29uc3QgVGRDb21wb25lbnQgPSB0aGlzLnByb3BzLnRkQ29tcG9uZW50XG4gICAgY29uc3QgUHJldmlvdXNDb21wb25lbnQgPSB0aGlzLnByb3BzLnByZXZpb3VzQ29tcG9uZW50XG4gICAgY29uc3QgTmV4dENvbXBvbmVudCA9IHRoaXMucHJvcHMubmV4dENvbXBvbmVudFxuICAgIGNvbnN0IExvYWRpbmdDb21wb25lbnQgPSB0aGlzLnByb3BzLmxvYWRpbmdDb21wb25lbnRcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgJ1JlYWN0VGFibGUnKX1cbiAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG4gICAgICA+XG4gICAgICAgIDxUYWJsZUNvbXBvbmVudFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0aGlzLnByb3BzLnRhYmxlQ2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy50YWJsZVN0eWxlfVxuICAgICAgICA+XG4gICAgICAgICAge2hhc0hlYWRlckdyb3VwcyAmJiAoXG4gICAgICAgICAgICA8VGhlYWRDb21wb25lbnRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRoaXMucHJvcHMudGhlYWRHcm91cENsYXNzTmFtZSwgJy1oZWFkZXJHcm91cHMnKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMudGhlYWRTdHlsZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnRyQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnRyU3R5bGV9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aGVhZGVyR3JvdXBzLm1hcCgoY29sdW1uLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8VGhDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgY29sU3Bhbj17Y29sdW1uLmNvbHVtbnMubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0aGlzLnByb3BzLnRoQ2xhc3NuYW1lLCBjb2x1bW4uaGVhZGVyQ2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy50aFN0eWxlLCBjb2x1bW4uaGVhZGVyU3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbHVtbi5oZWFkZXJJbm5lckNsYXNzTmFtZSwgJy10aC1pbm5lcicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMudGhJbm5lclN0eWxlLCBjb2x1bW4uaGVhZGVySW5uZXJTdHlsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGVvZiBjb2x1bW4uaGVhZGVyID09PSAnZnVuY3Rpb24nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Y29sdW1uLmhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW49e2NvbHVtbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBjb2x1bW4uaGVhZGVyfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L1RoQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxUaGVhZENvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRoaXMucHJvcHMudGhlYWRDbGFzc05hbWUpfVxuICAgICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMudGhlYWRTdHlsZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnRyQ2xhc3NOYW1lfVxuICAgICAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy50clN0eWxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZGVjb3JhdGVkQ29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvcnQgPSBzb3J0aW5nLmZpbmQoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8VGhDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50aENsYXNzbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4uaGVhZGVyQ2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIHNvcnQgPyAoc29ydC5hc2MgPyAnLXNvcnQtYXNjJyA6ICctc29ydC1kZXNjJykgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnLWN1cnNvci1wb2ludGVyJzogY29sdW1uLnNvcnRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJy1oaWRkZW4nOiAhc2hvd1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMudGhTdHlsZSwgY29sdW1uLmhlYWRlclN0eWxlKX1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlU29ydD17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4uc29ydGFibGUgJiYgdGhpcy5zb3J0Q29sdW1uKGNvbHVtbiwgZS5zaGlmdEtleSlcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjb2x1bW4uaGVhZGVySW5uZXJDbGFzc05hbWUsICctdGgtaW5uZXInKX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgY29sdW1uLmhlYWRlcklubmVyU3R5bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiBjb2x1bW4ubWluV2lkdGggKyAncHgnXG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7dHlwZW9mIGNvbHVtbi5oZWFkZXIgPT09ICdmdW5jdGlvbicgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29sdW1uLmhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLnByb3BzLmRhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbj17Y29sdW1ufVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApIDogY29sdW1uLmhlYWRlcn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L1RoQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICAgIDwvVGhlYWRDb21wb25lbnQ+XG4gICAgICAgICAgPFRib2R5Q29tcG9uZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModGhpcy5wcm9wcy50Ym9keUNsYXNzTmFtZSl9XG4gICAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy50Ym9keVN0eWxlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtwYWdlUm93cy5tYXAoKHJvdywgaSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByb3dJbmZvID0ge1xuICAgICAgICAgICAgICAgIHJvdzogcm93Ll9fb3JpZ2luYWwsXG4gICAgICAgICAgICAgICAgcm93VmFsdWVzOiByb3csXG4gICAgICAgICAgICAgICAgaW5kZXg6IHJvdy5fX2luZGV4LFxuICAgICAgICAgICAgICAgIHZpZXdJbmRleDogaVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModGhpcy5wcm9wcy50ckNsYXNzTmFtZSwgdGhpcy5wcm9wcy50ckNsYXNzQ2FsbGJhY2socm93SW5mbykpfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMudHJTdHlsZSwgdGhpcy5wcm9wcy50clN0eWxlQ2FsbGJhY2socm93SW5mbykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtkZWNvcmF0ZWRDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBDZWxsID0gY29sdW1uLnJlbmRlclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2kyfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbHVtbi5jbGFzc05hbWUsIHtoaWRkZW46ICFzaG93fSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy50ZFN0eWxlLCBjb2x1bW4uc3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbHVtbi5pbm5lckNsYXNzTmFtZSwgJy10ZC1pbm5lcicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgY29sdW1uLmlubmVyU3R5bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogY29sdW1uLm1pbldpZHRoICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3R5cGVvZiBDZWxsID09PSAnZnVuY3Rpb24nID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDZWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ucm93SW5mb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtyb3dJbmZvLnJvd1ZhbHVlc1tjb2x1bW4uaWRdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IHR5cGVvZiBDZWxsICE9PSAndW5kZWZpbmVkJyA/IENlbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiByb3dJbmZvLnJvd1ZhbHVlc1tjb2x1bW4uaWRdfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICB7cGFkUm93cy5tYXAoKHJvdywgaSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRoaXMucHJvcHMudHJDbGFzc05hbWUsICctcGFkUm93Jyl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy50clN0eWxlfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtkZWNvcmF0ZWRDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2kyfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbHVtbi5jbGFzc05hbWUsIHtoaWRkZW46ICFzaG93fSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy50ZFN0eWxlLCBjb2x1bW4uc3R5bGUpfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNvbHVtbi5pbm5lckNsYXNzTmFtZSwgJy10ZC1pbm5lcicpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgY29sdW1uLmlubmVyU3R5bGUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogY29sdW1uLm1pbldpZHRoICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgID4mbmJzcDs8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L1Rib2R5Q29tcG9uZW50PlxuICAgICAgICA8L1RhYmxlQ29tcG9uZW50PlxuICAgICAgICB7dGhpcy5wcm9wcy5zaG93UGFnaW5hdGlvbiAmJiAoXG4gICAgICAgICAgPFBhZ2luYXRpb25cbiAgICAgICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgICAgIHBhZ2VzTGVuZ3RoPXtwYWdlc0xlbmd0aH1cbiAgICAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbiAgICAgICAgICAgIHNob3dQYWdlU2l6ZU9wdGlvbnM9e3RoaXMucHJvcHMuc2hvd1BhZ2VTaXplT3B0aW9uc31cbiAgICAgICAgICAgIHBhZ2VTaXplT3B0aW9ucz17dGhpcy5wcm9wcy5wYWdlU2l6ZU9wdGlvbnN9XG4gICAgICAgICAgICBzaG93UGFnZUp1bXA9e3RoaXMucHJvcHMuc2hvd1BhZ2VKdW1wfVxuICAgICAgICAgICAgY2FuUHJldmlvdXM9e2NhblByZXZpb3VzfVxuICAgICAgICAgICAgY2FuTmV4dD17Y2FuTmV4dH1cbiAgICAgICAgICAgIHByZXZpb3VzVGV4dD17dGhpcy5wcm9wcy5wcmV2aW91c1RleHR9XG4gICAgICAgICAgICBuZXh0VGV4dD17dGhpcy5wcm9wcy5uZXh0VGV4dH1cbiAgICAgICAgICAgIHByZXZpb3VzQ29tcG9uZW50PXtQcmV2aW91c0NvbXBvbmVudH1cbiAgICAgICAgICAgIG5leHRDb21wb25lbnQ9e05leHRDb21wb25lbnR9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuc2V0UGFnZX1cbiAgICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMuc2V0UGFnZVNpemV9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAgPExvYWRpbmdDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH0sXG4gIC8vIFVzZXIgYWN0aW9uc1xuICBzZXRQYWdlIChwYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5maXJlT25DaGFuZ2UoKVxuICAgIH0pXG4gIH0sXG4gIHNldFBhZ2VTaXplIChwYWdlU2l6ZSkge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlU2l6ZSA9IHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJylcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9IHRoaXMuZ2V0UHJvcE9yU3RhdGUoJ3BhZ2UnKVxuICAgIGNvbnN0IGN1cnJlbnRSb3cgPSBjdXJyZW50UGFnZVNpemUgKiBjdXJyZW50UGFnZVxuICAgIGNvbnN0IHBhZ2UgPSBNYXRoLmZsb29yKGN1cnJlbnRSb3cgLyBwYWdlU2l6ZSlcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgcGFnZVxuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlKClcbiAgICB9KVxuICB9LFxuICBzb3J0Q29sdW1uIChjb2x1bW4sIGFkZGl0aXZlKSB7XG4gICAgY29uc3QgZXhpc3RpbmdTb3J0aW5nID0gdGhpcy5nZXRTb3J0aW5nKClcbiAgICBsZXQgc29ydGluZyA9IF8uY2xvbmUodGhpcy5zdGF0ZS5zb3J0aW5nIHx8IFtdKVxuICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBzb3J0aW5nLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IHNvcnRpbmdbZXhpc3RpbmdJbmRleF1cbiAgICAgIGlmIChleGlzdGluZy5hc2MpIHtcbiAgICAgICAgZXhpc3RpbmcuYXNjID0gZmFsc2VcbiAgICAgICAgaWYgKCFhZGRpdGl2ZSkge1xuICAgICAgICAgIHNvcnRpbmcgPSBbZXhpc3RpbmddXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIHNvcnRpbmcuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhpc3RpbmcuYXNjID0gdHJ1ZVxuICAgICAgICAgIHNvcnRpbmcgPSBbZXhpc3RpbmddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgIHNvcnRpbmcucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICBhc2M6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNvcnRpbmcgPSBbe1xuICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgYXNjOiB0cnVlXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHBhZ2UgPSAoZXhpc3RpbmdJbmRleCA9PT0gMCB8fCAoIWV4aXN0aW5nU29ydGluZy5sZW5ndGggJiYgc29ydGluZy5sZW5ndGgpIHx8ICFhZGRpdGl2ZSkgPyAwIDogdGhpcy5zdGF0ZS5wYWdlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYWdlLFxuICAgICAgc29ydGluZ1xuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlKClcbiAgICB9KVxuICB9XG59KVxuIl19