import { runSaga } from "redux-saga";
export default async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: action => {
        dispatched.push(action);
        // console.log(dispatched);
      }
    },
    saga,
    initialAction
  ).done;
  console.log(dispatched);

  return dispatched;
}
