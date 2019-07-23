/* globals expect */

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import "@testing-library/react/cleanup-after-each";

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
