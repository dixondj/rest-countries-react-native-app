import {Platform} from 'react-native';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F8EEDE',
  },

  headerWrapper: {
    backgroundColor: '#D6C6A8',
    paddingVertical: 13,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
  },

  headerText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
    color: '#8A663F',
  },

  inputText: {
    backgroundColor: '#FFF9EE',
    ...Platform.select({
      ios: {
        height: 30,
      },
    }),
    marginLeft: 7,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9EE',
    borderColor: '#8A663F',
    borderWidth: 1,
    borderRadius: 15,
  },
  inputLogo: {
    backgroundColor: '#FFF9EE',
    width: 18,
    height: 18,
  },
  countriesListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9EE',
    marginHorizontal: 25,
    marginBottom: 200,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 20,
  },
  countriesListWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  countriesListImage: {
    width: 230,
    height: 130,
    borderRadius: 20,
    borderWidth: 1,
  },
  countriesListText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A663F',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#8A663F',
  },
  loadingTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: -40,
  },
};

export default styles;
