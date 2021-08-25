import HotPlaceMap from './screens/HotPlaceMapScreen';
import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';
import './index.css';

function App() {
  return (
    <RecoilRoot>
      <HotPlaceMap></HotPlaceMap>;
    </RecoilRoot>
  );
}

export default App;
