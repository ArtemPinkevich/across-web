import { LoadingType } from "../../truck/LoadingType";

export const LOADING_TYPE_DISPLAY_NAME_MAP = new Map<Object, string>([
    [LoadingType.top, "Верхняя"],
    [LoadingType.side, "Боковая"],
    [LoadingType.rear, "Задняя"],
    [LoadingType.full, "С полной растентовкой"],
    [LoadingType.withSlidingRoof, "Со снятием поперечных перекладин"],
    [LoadingType.withRemovablePillars, "Со снятием стоек"],
    [LoadingType.withoutGates, "Без ворот"],
    [LoadingType.hydroboard, "Гидроборт"],
    [LoadingType.apparels, "Аппарели"],
    [LoadingType.withCrate, "С обрешеткой"],
    [LoadingType.withBoards, "С бортами"],
    [LoadingType.sideBySide, "Боковая с 2-х сторон"],
    [LoadingType.pour, "Налив"],
    [LoadingType.electric, "Электрический"],
    [LoadingType.hydraulic, "Гидравлический"],
    [LoadingType.unspecified, "Не указан"],
    [LoadingType.pneumatic, "Пневматический"],
    [LoadingType.dieselCompressor, "Дизельный компрессор"],
]);

export const LOADING_TYPE_DISPLAY_NAME_ARRAY = Array.from(LOADING_TYPE_DISPLAY_NAME_MAP, ([value, displayName]) => ({ value, displayName }));
