import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

class GeneralSEOData extends React.Component {
  state = {
    general_data: '',
    showSEOMessage: true,
    loading: true
  };

  componentDidMount = () => {
    this.getGeneralData();
    // this.setState({ loading: false });
  };

  getGeneralData = async () => {
    try {
      const { data: general_data_acf } = await axios.get('/api/general_data');
      const gda = general_data_acf.acf.home_seo_writeup;
      this.setState({ general_data: gda, loading: false });
    } catch (e) {
      console.log('Issue arose.', e);
    }
  };

  setCookie = () => {
    document.cookie = 'showSEOMessage=false';
  };

  toggleSEOMessage = () => {
    const { toggleSEOMessage } = this.props;
    this.setCookie();
    toggleSEOMessage(false);
  };

  render() {
    const { showSEOMessage, loading, general_data } = this.state;
    if (loading) return null;
    return (
      <div className="greater-zion-description-outer-wrapper">
        {showSEOMessage && general_data && (
          <section
            className="greater-zion-description wrapper"
            style={{
              display: 'block',
              position: 'relative',
              marginTop: '1rem',
              color: '#4e4e4e',
              borderTop: '1px solid',
              padding: '1rem'
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: general_data }}
              style={{
                display: 'block'
              }}
            />
            <button
              type="button"
              style={{
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                width: '100%',
                position: 'absolute',
                top: '2rem',
                right: '0',
                textAlign: 'right',
                fontSize: '1.25rem'
              }}
              onClick={() => {
                this.setState({ showSEOMessage: false });
                return this.toggleSEOMessage(false);
              }}
            >
              CLOSE X
            </button>
          </section>
        )}
      </div>
    );
  }
}

GeneralSEOData.propTypes = {
  toggleSEOMessage: PropTypes.func.isRequired
};

// Redux
const mapStateToProps = state => ({ showSEOMessage: state.map.showSEOMessage });
const mapDispatchToProps = dispatch => ({
  toggleSEOMessage: status => dispatch({ type: 'TOGGLE_SEO_MESSAGE', status })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralSEOData);
