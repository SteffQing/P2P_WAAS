import evm_tests from "./evm";

async function test() {
  evm_tests();
}
test().catch((e) => console.error(e));
