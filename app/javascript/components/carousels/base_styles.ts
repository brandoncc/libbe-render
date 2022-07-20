import * as csx from 'csstips';

const styles = {
  carousel: {
    ...csx.vertical,
    border: '1px solid #f0f0f0',
    borderRadius: 3,
    marginBottom: 20,
    marginTop: 20
  },
  content: {
    ...csx.horizontal
  },
  nav: {
    ...csx.vertical,
    background: '#2e5189',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTop: '1px solid #f0f0f0',
    marginTop: 'auto',
    minHeight: 60,
    paddingLeft: 18,
    paddingRight: 18,
    '&>*': {
      flex: 1
    }
  },
  navBottom: {
    marginTop: -6,
    textAlign: 'center'
  },
  navTop: {
    ...csx.horizontal,
    ...csx.betweenJustified
  },
  navButton: {
    background: 'transparent !important',
    color: 'white !important',
    height: 8,
    width: 10,
    margin: 0,
    padding: '15px 18px 15px 12px',
    '&.disabled': {
      opacity: 0.5
    },
    '&:first-child': {
      marginLeft: -12,
      '&::before': {
        content: "'\\f053'",
        display: 'block',
        fontFamily: 'FontAwesome',
        fontSize: 8,
        lineHeight: 1,
        height: 10,
        width: 10,
        '-webkit-font-smoothing': 'antialiased'
      }
    },
    '&:last-child': {
      marginRight: -8,
      '&::before': {
        content: "'\\f054'",
        display: 'block',
        fontFamily: 'FontAwesome',
        fontSize: 8,
        lineHeight: 1,
        height: 10,
        width: 10,
        '-webkit-font-smoothing': 'antialiased'
      }
    }
  },
  navDot: {
    background: '#6f95cc',
    marginLeft: 6,
    marginRight: 6,
    padding: 0,
    '&.active': {
      background: '#dfa812',
      '&:hover': {
        background: '#dfa812'
      }
    },
    '&:hover': {
      background: '#6f95cc'
    }
  },
  navTitle: {
    color: '#ffffff !important',
    marginBottom: '0 !important',
    marginTop: 7,
    fontWeight: 600
  },
  preloadedImage: {
    height: '0px !important',
    width: '0px !important',
    display: 'none !important'
  }
};

export default styles;
