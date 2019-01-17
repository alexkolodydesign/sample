import styled from '@emotion/styled';

const TrailSidebarStyles = styled.div`
  @media screen {
    .background {
      background: #fff;
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.98),
          rgba(255, 255, 255, 0.98)
        ),
        url(/static/images/background-pattern.svg);
      background-position: center;
      background-size: 29rem auto;
      &.details {
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;

        .trail_description {
          grid-column-start: 1;
          grid-column-end: 3;
        }

        p {
          margin: 0 0 2rem 0;
          text-transform: uppercase;
          font-weight: 500;
          span {
            font-weight: 100;
            text-transform: initial;
          }
        }
      }
    }
    .trail_description,
    .trail_directions {
      grid-column-start: 1;
      grid-column-end: 3;

      .description {
        font-weight: 100;
      }
    }
    .use-icon {
      max-width: 30px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .buttons {
      margin-top: 3rem;
    }
    button {
      border: none;
      width: 100%;
      margin-bottom: 1.5rem;
      padding: 1.5rem 3rem;
      color: #fff;
      font-size: 1.8rem;
      cursor: pointer;
      transition: all 500ms;
      background: #4d4e4e;
      &:hover {
        background: #262727;
      }
      &:first-child {
        background: #3fa9f5;
        &:hover {
          background: #0d93f2;
        }
      }
    }
    .trail-general-icons {
      img {
        max-width: 40px;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  @media screen and (min-width: 768px) {
    .background {
      &.details {
        display: block;
      }
    }
  }
  @media screen and (min-width: 992px) {
    .background {
      &.details {
        padding: 3rem;
      }
    }
  }

  @media print {
    .sidebar {
      width: 30%;
      float: left;
    }
    img {
      display: none;
    }
    *,
    *:before,
    *:after {
      background: #ffffff;
    }
    /*
  *, *:before, *:after {
    display: none;
  }
  */
  }
`;

export default TrailSidebarStyles;
