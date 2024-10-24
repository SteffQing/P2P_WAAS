import evm_tests from "./evm";

async function test() {
  evm_tests();
}
test()
  .then(() => console.log("Complete tests"))
  .catch((e) => console.error(e));
