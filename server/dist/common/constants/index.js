"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCategory = exports.Semester = exports.Role = void 0;
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Uploader"] = "uploader";
})(Role || (exports.Role = Role = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "1st";
    Semester["Second"] = "2nd";
})(Semester || (exports.Semester = Semester = {}));
var BookCategory;
(function (BookCategory) {
    BookCategory["LectureNote"] = "lectureNote";
    BookCategory["PastQuestion"] = "pastQuestion";
    BookCategory["TextBook"] = "textBook";
})(BookCategory || (exports.BookCategory = BookCategory = {}));
