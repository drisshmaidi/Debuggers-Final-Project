import AddEvent from "../components/eventSection/AddEvent.js";

const CreateEvent = async({ UID })=>{
let userType;
    try {
      const res = await fetch("/api/addNewEvent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userID: UID,
        }),
      });
       userType = await res.json();
console.log(userType[0].type === "Admin");

    } catch (e) {
      console.log(e);
    }
    return (
			<div>
				{/* <Header></Header> */}
                <AddEvent />
				{userType[0].type === "Admin"?<AddEvent />:"Unauthorized access"}

				{/* <Footer></Footer> */}
			</div>
		);
};

export default CreateEvent;