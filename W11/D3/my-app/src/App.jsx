import './App.css'
import {ManagingApiState} from './components/P1';
import {UseEffectLifecycle} from './components/P2';
import {AxiosLifecycle} from './components/P3';
import {CRUDOperation} from './components/P4';
import {PaginationCaching} from './components/P5';
import {UploadErrorBoundary} from './components/P6';
function App() {
  
  return (
    <>
     {/* <ManagingApiState/> */}
     {/* <UseEffectLifecycle/> */}
     {/* <AxiosLifecycle/> */}
     {/* <CRUDOperation/> */}
     {/* <PaginationCaching/> */}
    <UploadErrorBoundary/>
    </>
  )
}
export default App