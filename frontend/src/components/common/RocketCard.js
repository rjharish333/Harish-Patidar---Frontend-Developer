import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";

  import cardImage from '../../assets/images/card_image.jpg'

// Common component to display rocket card
const RocketCard = ({rocket, handleView}) => {
  return (
    <Card className="w-96 mb-8">
    <CardHeader color="blue" className="relative h-56">
        <img
        src={cardImage}
        alt="img-blur-shadow"
        className="h-full w-full"
        />
    </CardHeader>
    <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          Serial - {rocket?.capsule_serial}
        </Typography>
        <Typography style={{minHeight: '70px'}}>
          {rocket?.details || "NA"}
        </Typography>
        <Typography>
          <b>Type:</b> {rocket?.type}
        </Typography>
        <Typography>
          <b>Status:</b> {rocket?.status}
        </Typography>
        <button onClick={() => handleView(rocket?.capsule_serial)} className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 mt-8 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
        >
          View
        </button>
    </CardBody>
    <CardFooter divider className="flex items-center justify-between py-3" style={{backgroundColor: "#013368"}} >
        <Typography variant="small" color="white"> <b>Missions:</b> {rocket?.missions?.length}</Typography>
        <Typography variant="small" color="white" className="flex gap-1">
        <b>Landings:</b> {rocket?.landings}
        </Typography>
    </CardFooter>
    </Card>
  )
}

export default RocketCard;