import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";

export function TradePetr4() {
  return (
    <div className="mt-12 mb-8 flex gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Trade petr4
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex w gap-4" >
            <p>bid price: 3205</p>
            <Button color="green">BUY</Button>
            <p>ask price: 3204</p>
            <Button color="red">SELL</Button>
          </div>

        </CardBody>
      </Card>
    </div>
  );
}

export default TradePetr4;
