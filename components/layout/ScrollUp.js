
export default class ScrollUp extends React.Component {
  constructor(props) {
    super(props)
    this.ScrollToTop = this.ScrollToTop.bind(this)
  }
  ScrollToTop() {
    //javascript to scroll to top
    console.log("Scroll to top");
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div className="scrollup-link">
        <div onClick={this.ScrollToTop}>
          <img width="20" height="20" src="/static/images/scrollup.svg" alt="" className="" />
        </div>
        <style jsx>{`
          .scrollup-link {
            padding: 1rem;
            text-align: center;
            display: block;
            background: #4d4e4e;
            position: fixed;
            bottom: 0;
            right: 0;
            img {
              display: block;
            }
          }
        `}</style>
      </div>
    )
  }
}

