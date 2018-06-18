import React, { Component } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      totalPages: this.props.totalPages
    };
  }

  handlePageChange(Page) {
    console.log("hanldePageCange", Page);
    this.setState({ activePage: Page });
    if (this.props.handlePageChange !== undefined) {
      this.props.handlePageChange(Page - 1);
    }
  }
  render() {
    let _page = this.props.page + 1;
    return (
      <div className="containerPaginator mauto t-center">
        <Pagination
          onChange={Page => this.handlePageChange(Page)}
          current={_page}
          locale={localeInfo}
          className="dInlineBlock m5"
          defaultPageSize={1}
          total={this.state.totalPages}
        />
      </div>
    );
  }
}

Paginator.defaultProps = {
  totalPages: 10,
  page: 1
};
export default Paginator;
