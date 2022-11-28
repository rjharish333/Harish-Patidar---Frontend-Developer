
import { convertISOtoDate } from './../utils/utils';

// single modal view for show capsule details
export default function RocketModal({rocketDetails, showModal, handleClose}) {

    return (
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative my-6 mx-auto max-w-3xl w-full">
                {/*content*/}
                {
                rocketDetails &&
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {rocketDetails?.capsule_serial} - <span className="text-2xl"><b>Total Landings:</b> {rocketDetails?.landings}</span>
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => handleClose(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed flex">
                       <p className="mx-4"> <b>Capsule Status:</b> {rocketDetails?.status}</p>
                       <p className="mx-4"> <b>Capsule ID:</b> {rocketDetails?.capsule_id}</p>
                       <p className="mx-4"> <b>Launch Date:</b> {convertISOtoDate(rocketDetails?.original_launch)}</p>
                    </p>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed flex">
                       <p className="mx-4"> <b>Type:</b> {rocketDetails?.type}</p>
                       <p className="mx-4"> <b>Details:</b> {rocketDetails?.details && "NA"}</p>
                       <p className="mx-4"> <b>Reuse Count:</b> {rocketDetails?.reuse_count}</p>

                    </p>
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                       <p className="mx-4"> <b>Missions:</b></p>
                       <div className="my-4 text-slate-500 text-lg leading-relaxed flex">
                       { rocketDetails?.missions.length > 0 ? rocketDetails.missions.map((value, index) => 
                        <p key={index}>
                            <p className="mx-4"> <b>Name:</b> {value?.name || "NA"}</p>
                            <p className="mx-4"> <b>Flight:</b> {value?.flight || "NA"}</p>
                        </p>
                       )
                       : <p className="mx-4"> <b>NA</b></p>
                       }
                       </div>
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => handleClose(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                }
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }