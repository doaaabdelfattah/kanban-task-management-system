

import Button from "./_components/reusable/Button";
import CheckBoxItem from "./_components/reusable/CheckBoxItem";
import CheckBox from "./_components/reusable/CheckBoxItem";
import DropDownMenu from "./_components/reusable/DropDownMenu";

import TextInputItem from "./_components/reusable/TextInputItem";


export default function Home() {
  return (
    <>
      <h1 className="heading-xl text-amber-700">Hello world</h1>
      <h1 className="heading-lg text-amber-700">Hello world</h1>
      <h1 className="heading-md text-amber-700">Hello world</h1>
      <h1 className="heading-sm text-amber-700">Hello world</h1>
      <h1 className="body-lg text-amber-700">Body (M) -  - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Phasellus hendrerit.Pellentesque aliquet nibh nec urna.In nisi neque, aliquet vel, dapibus id, mattis vel, nisi.Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.Nullam mollis.Ut justo.Suspendisse potenti.Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. </h1>
      <h1 className="body-md text-amber-700">Body (M) -  - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.</h1>

      <Button size='large' color='primary' >ButtonPrimaryL</Button>
      <Button size='small' color='primary' >ButtonPrimarysmall</Button>
      <Button size='small' color='secondary' >ButtonPrimarysmall</Button>
      <Button size='small' color='destructive' >ButtonPrimarysmall</Button>
      <CheckBoxItem />
      <CheckBoxItem />
      <CheckBoxItem />
      <div className="h-[80vh] w-5xl mx-auto gap-10 flex">

        <TextInputItem />
        <TextInputItem onStatus='error' />
      </div>
      <div className="h-[80vh] mx-auto">


        <DropDownMenu />
      </div>
    </>
  );
}
