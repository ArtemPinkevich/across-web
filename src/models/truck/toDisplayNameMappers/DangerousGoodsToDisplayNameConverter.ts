import { IDangerousGoods } from "../truck";

export const DangerousGoodsToDisplayNameConverter = (dangerousGoods: IDangerousGoods) => {
	if (!dangerousGoods) return "";

	const dangerousDisplayNames: string[] = [];

	if (dangerousGoods.adr1) dangerousDisplayNames.push("ADR-1");
	if (dangerousGoods.adr2) dangerousDisplayNames.push("ADR-2");
	if (dangerousGoods.adr3) dangerousDisplayNames.push("ADR-3");
	if (dangerousGoods.adr4) dangerousDisplayNames.push("ADR-4");
	if (dangerousGoods.adr5) dangerousDisplayNames.push("ADR-5");
	if (dangerousGoods.adr6) dangerousDisplayNames.push("ADR-6");
	if (dangerousGoods.adr7) dangerousDisplayNames.push("ADR-7");
	if (dangerousGoods.adr8) dangerousDisplayNames.push("ADR-8");
	if (dangerousGoods.adr9) dangerousDisplayNames.push("ADR-9");

	return dangerousDisplayNames.join(", ");
};
