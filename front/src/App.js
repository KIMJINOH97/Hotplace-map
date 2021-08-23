import HotPlaceMap from './components/HotPlaceMap';
import KakaoMap from './components/KakaoMap';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
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
