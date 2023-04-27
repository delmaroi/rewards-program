import { getRewardsByMonth } from "./utils";

function RewardsByMonth({ transactions }) {
  const rewardsByMonth = getRewardsByMonth(transactions);

  return (
    <div className="py-4  my-4">
      <h2 className="text-base font-semibold leading-6 text-primary pb-4">
        Rewards Points by Month
      </h2>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {Object.keys(rewardsByMonth).map((customerId, idx) => (
          <li
            key={`${customerId}-${idx}`}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="text-sm font-medium leading-6 text-gray-900">
                Customer {customerId}
              </div>
            </div>

            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              {Object.keys(rewardsByMonth[customerId]).map((month, idx) => (
                <div
                  className="flex justify-between gap-x-4 py-3"
                  key={`${month}-${idx}`}
                >
                  <dt className="text-gray-500">Month {month}:</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">
                      {rewardsByMonth[customerId][month]} points
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RewardsByMonth;
