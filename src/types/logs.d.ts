import { type WatchEventOnLogsParameter } from "viem";
declare global {
  type SmartWalletLogs = WatchEventOnLogsParameter<
    undefined,
    readonly [
      {
        readonly name: "ReceivedETH";
        readonly type: "event";
        readonly inputs: readonly [
          {
            readonly name: "amount";
            readonly type: "uint256";
          }
        ];
      },
      {
        readonly name: "SentETH";
        readonly type: "event";
        readonly inputs: readonly [
          {
            readonly name: "amount";
            readonly type: "uint256";
          }
        ];
      },
      {
        readonly name: "SentToken";
        readonly type: "event";
        readonly inputs: readonly [
          {
            readonly type: "string";
            readonly name: "symbol";
          },
          {
            readonly name: "amount";
            readonly type: "uint256";
          }
        ];
      }
    ],
    true,
    undefined
  >;

  type Erc20Logs = WatchEventOnLogsParameter<
    {
      readonly name: "Transfer";
      readonly type: "event";
      readonly inputs: readonly [
        {
          readonly type: "address";
          readonly name: "from";
          readonly indexed: true;
        },
        {
          readonly type: "address";
          readonly name: "to";
          readonly indexed: true;
        },
        {
          readonly name: "value";
          readonly type: "uint256";
        }
      ];
    },
    readonly [
      {
        readonly name: "Transfer";
        readonly type: "event";
        readonly inputs: readonly [
          {
            readonly type: "address";
            readonly name: "from";
            readonly indexed: true;
          },
          {
            readonly type: "address";
            readonly name: "to";
            readonly indexed: true;
          },
          {
            readonly name: "value";
            readonly type: "uint256";
          }
        ];
      }
    ],
    true,
    "Transfer"
  >;

  type HotWalletLogs = WatchEventOnLogsParameter<
    undefined,
    readonly [
      {
        readonly name: "SentETH";
        readonly type: "event";
        readonly inputs: readonly [
          {
            readonly type: "address";
            readonly name: "sender";
          },
          {
            readonly name: "amount";
            readonly type: "uint256";
          }
        ];
      },
      {
        readonly name: "SentToken";
        readonly type: "event";
        readonly inputs: readonly [
          {
            readonly type: "address";
            readonly name: "sender";
          },
          {
            readonly type: "string";
            readonly name: "symbol";
          },
          {
            readonly name: "amount";
            readonly type: "uint256";
          }
        ];
      }
    ],
    true,
    undefined
  >;
}
