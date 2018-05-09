const SelectTrailType = props =>
  <div className="trails">
    <img src="/static/images/menu/hiking.svg" alt="Select Hiking Trails" />
    <img src="/static/images/menu/biking.svg" alt="Select Biking Trails" />
    <img src="/static/images/menu/horse.svg" alt="Select Horseback Trails" />
    <img src="/static/images/menu/atv.svg" alt="Select ATV Trails" />
    <style jsx>{`
      .trails {
        grid-column-start: 2;
      }
      img {
        width: 5.5rem;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    `}</style>
  </div>

export default SelectTrailType
