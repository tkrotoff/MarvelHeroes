import '@babel/polyfill'; // Do we want to run the tests with the polyfills?

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
