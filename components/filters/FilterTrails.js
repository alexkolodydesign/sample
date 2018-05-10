const FilterTrails = props =>
  <React.Fragment>
    <button>
      <img src="/static/images/menu/filter.svg" alt="Filter Trails"/>
      <p>Filter Trails</p>
    </button>
    <style jsx>{`
      button {
        background: #4d4e4e;
        color: #fff;
        border: none;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 500ms;
        &:hover {
          background: #262727;
        }
      }
      img {
        width: 4.5rem;
      }
      p {
        margin: 0;
        padding-right: 2.5rem;
      }
    `}</style>
  </React.Fragment>

export default FilterTrails