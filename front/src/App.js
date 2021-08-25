import HotPlaceMapScreen from './screens/HotPlaceMapScreen';
import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';
import './index.css';

function App() {
  return (
    <RecoilRoot>
      <HotPlaceMapScreen></HotPlaceMapScreen>;
    </RecoilRoot>
  );
}

export default App;
