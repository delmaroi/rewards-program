import { getRewardsByMonth } from "./utils";

export const RewardsPointsByMonth = ({ transactions }) => {
  const rewardsByMonth = getRewardsByMonth(transactions);

  return (
    <div className="py-4">
      <h2 className="text-base font-semibold leading-6 text-primary pb-4">
        Reward Points by Month
      </h2>

      {rewardsByMonth ? (
        <ul className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-4">
          {Object.keys(rewardsByMonth).map((customerName, idx) => (
            <li
              key={`${customerName}-${idx}`}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <div className="text-sm leading-6 text-gray-900 font-bold">
                  Customer {customerName}
                </div>
              </div>

              <dl className=" divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                {Object.keys(rewardsByMonth[customerName]).map((month, idx) => (
                  <div
                    className="flex justify-between gap-x-4 p-2 hover:bg-gray-100"
                    key={`${month}-${idx}`}
                  >
                    <dt className="text-gray-500">Month {month}:</dt>
                    <dd className="flex items-start gap-x-2">
                      <div className="font-medium text-gray-900">
                        {rewardsByMonth[customerName][month]} points
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      ) : (
        <span>No Items</span>
      )}
    </div>
  );
};
