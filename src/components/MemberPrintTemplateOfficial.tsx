import React from "react";
import { Member, Course, DietPlan } from "@/lib/types";

interface MemberPrintTemplateOfficialProps {
  member: Member;
  courses: Course[];
  dietPlans: DietPlan[];
}

export const MemberPrintTemplateOfficial: React.FC<
  MemberPrintTemplateOfficialProps
> = ({ member, courses, dietPlans }) => {
  // Get course names from IDs
  const getMemberCourses = () => {
    const memberCourseIds = member.courses || [];
    return courses.filter((course) => memberCourseIds.includes(course.id));
  };

  // Get diet plan names from IDs
  const getMemberDietPlans = () => {
    const memberDietPlanIds = member.dietPlans || [];
    return dietPlans.filter((diet) => memberDietPlanIds.includes(diet.id));
  };

  // Get course groups with course names
  const getCourseGroupsWithNames = () => {
    if (!member.courseGroups) return [];
    return member.courseGroups.map((group) => ({
      ...group,
      courses: courses.filter((course) => group.courseIds.includes(course.id)),
    }));
  };

  // Get diet plan groups with names
  const getDietPlanGroupsWithNames = () => {
    if (!member.dietPlanGroups) return [];
    return member.dietPlanGroups.map((group) => ({
      ...group,
      dietPlans: dietPlans.filter((diet) =>
        group.dietPlanIds.includes(diet.id),
      ),
    }));
  };

  const memberCourses = getMemberCourses();
  const memberDietPlans = getMemberDietPlans();
  const courseGroups = getCourseGroupsWithNames();
  const dietPlanGroups = getDietPlanGroupsWithNames();

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB"); // DD/MM/YYYY format
  };

  return (
    <>
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print-container {
            display: block !important;
          }
          
          #member-print-content {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .course-group, .diet-group {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 8px;
          }
          
          .course-item, .diet-item {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .member-info-grid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .content-columns {
            display: flex !important;
            flex-direction: row !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          @page {
            margin: 12mm;
            size: A4;
          }
        }
      `}</style>
      <div className="print-container" style={{ display: "none" }}>
        <div
          id="member-print-content"
          className="bg-white font-arabic"
          style={{
            width: "210mm",
            minHeight: "297mm",
            margin: "0 auto",
            fontSize: "13px",
            lineHeight: "1.3",
            direction: "rtl",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white",
            color: "#000000",
            padding: "12mm",
            pageBreakInside: "avoid",
          }}
        >
          {/* Header with Gym Name and Logo */}
          <div
            className="print-section"
            style={{
              textAlign: "center",
              marginBottom: "25px",
              paddingBottom: "15px",
              borderBottom: "3px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              pageBreakInside: "avoid",
            }}
          >
            <div style={{ flex: 1, textAlign: "right" }}>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#000000",
                  margin: "0 0 8px 0",
                  letterSpacing: "1px",
                }}
              >
                صالة حسام لكمال الأجسام والرشاقة
              </h1>
              <p
                style={{
                  fontSize: "16px",
                  color: "#000000",
                  margin: "0",
                  fontWeight: "normal",
                }}
              >
                بطاقة عضوية رسمية
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <img
                src="/placeholder.svg"
                alt="شعار الصالة"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: "3px solid #000000",
                  objectFit: "cover",
                  backgroundColor: "#f8f9fa",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Member Information */}
          <div
            className="print-section member-info-grid"
            style={{
              marginBottom: "25px",
              padding: "15px",
              border: "2px solid #000000",
              backgroundColor: "#f8f9fa",
              pageBreakInside: "avoid",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "12px",
                textAlign: "center",
                borderBottom: "1px solid #000000",
                paddingBottom: "6px",
              }}
            >
              المعلومات الشخصية
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "4px",
                    color: "#000000",
                  }}
                >
                  الاسم الكامل
                </div>
                <div
                  style={{
                    padding: "6px",
                    border: "1px solid #000000",
                    backgroundColor: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {member.name}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "4px",
                    color: "#000000",
                  }}
                >
                  رقم الهاتف
                </div>
                <div
                  style={{
                    padding: "6px",
                    border: "1px solid #000000",
                    backgroundColor: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {member.phone}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "4px",
                    color: "#000000",
                  }}
                >
                  العمر
                </div>
                <div
                  style={{
                    padding: "6px",
                    border: "1px solid #000000",
                    backgroundColor: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {member.age} سنة
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "4px",
                    color: "#000000",
                  }}
                >
                  تاريخ الانضمام
                </div>
                <div
                  style={{
                    padding: "6px",
                    border: "1px solid #000000",
                    backgroundColor: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {formatDate(member.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Optimized Layout */}
          <div
            className="content-columns"
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "25px",
              pageBreakInside: "avoid",
            }}
          >
            {/* Right Column - Training Programs */}
            <div
              className="print-section"
              style={{
                flex: 1,
                border: "2px solid #000000",
                padding: "15px",
                backgroundColor: "white",
                pageBreakInside: "avoid",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#000000",
                  marginBottom: "12px",
                  textAlign: "center",
                  borderBottom: "1px solid #000000",
                  paddingBottom: "6px",
                }}
              >
                البرامج التدريبية
              </h3>

              <div style={{ minHeight: "150px" }}>
                {/* Course Groups */}
                {courseGroups.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    {courseGroups.map((group, index) => (
                      <div
                        key={group.id}
                        className="course-group"
                        style={{
                          marginBottom: "10px",
                          padding: "8px",
                          border: "1px solid #000000",
                          backgroundColor:
                            index % 2 === 0 ? "#f8f9fa" : "white",
                          pageBreakInside: "avoid",
                        }}
                      >
                        {group.title && (
                          <h4
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#000000",
                              marginBottom: "6px",
                              borderBottom: "1px dashed #000000",
                              paddingBottom: "3px",
                            }}
                          >
                            {group.title}
                          </h4>
                        )}
                        <div
                          style={{ paddingRight: group.title ? "10px" : "0" }}
                        >
                          {group.courses.map((course) => (
                            <div
                              key={course.id}
                              className="course-item"
                              style={{
                                padding: "3px 0",
                                fontSize: "11px",
                                color: "#000000",
                                borderBottom: "1px dotted #cccccc",
                                display: "flex",
                                alignItems: "center",
                                pageBreakInside: "avoid",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "6px",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                •
                              </span>
                              {course.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Individual Courses */}
                {memberCourses.length > 0 && (
                  <div>
                    {memberCourses.map((course, index) => (
                      <div
                        key={course.id}
                        className="course-item"
                        style={{
                          padding: "6px",
                          marginBottom: "4px",
                          border: "1px solid #000000",
                          backgroundColor:
                            index % 2 === 0 ? "#f8f9fa" : "white",
                          fontSize: "11px",
                          color: "#000000",
                          display: "flex",
                          alignItems: "center",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <span
                          style={{
                            marginLeft: "6px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          •
                        </span>
                        {course.name}
                      </div>
                    ))}
                  </div>
                )}

                {memberCourses.length === 0 && courseGroups.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#666666",
                      fontSize: "12px",
                      padding: "20px",
                      border: "1px dashed #cccccc",
                    }}
                  >
                    لم يتم تحديد برامج تدريبية
                  </div>
                )}
              </div>
            </div>

            {/* Left Column - Diet Plans */}
            <div
              className="print-section"
              style={{
                flex: 1,
                border: "2px solid #000000",
                padding: "15px",
                backgroundColor: "white",
                pageBreakInside: "avoid",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#000000",
                  marginBottom: "12px",
                  textAlign: "center",
                  borderBottom: "1px solid #000000",
                  paddingBottom: "6px",
                }}
              >
                الأنظمة الغذائية
              </h3>

              <div style={{ minHeight: "150px" }}>
                {/* Diet Plan Groups */}
                {dietPlanGroups.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    {dietPlanGroups.map((group, index) => (
                      <div
                        key={group.id}
                        className="diet-group"
                        style={{
                          marginBottom: "10px",
                          padding: "8px",
                          border: "1px solid #000000",
                          backgroundColor:
                            index % 2 === 0 ? "#f8f9fa" : "white",
                          pageBreakInside: "avoid",
                        }}
                      >
                        {group.title && (
                          <h4
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#000000",
                              marginBottom: "6px",
                              borderBottom: "1px dashed #000000",
                              paddingBottom: "3px",
                            }}
                          >
                            {group.title}
                          </h4>
                        )}
                        <div
                          style={{ paddingRight: group.title ? "10px" : "0" }}
                        >
                          {group.dietPlans.map((diet) => (
                            <div
                              key={diet.id}
                              className="diet-item"
                              style={{
                                padding: "3px 0",
                                fontSize: "11px",
                                color: "#000000",
                                borderBottom: "1px dotted #cccccc",
                                display: "flex",
                                alignItems: "center",
                                pageBreakInside: "avoid",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "6px",
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                •
                              </span>
                              {diet.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Individual Diet Plans */}
                {memberDietPlans.length > 0 && (
                  <div>
                    {memberDietPlans.map((diet, index) => (
                      <div
                        key={diet.id}
                        className="diet-item"
                        style={{
                          padding: "6px",
                          marginBottom: "4px",
                          border: "1px solid #000000",
                          backgroundColor:
                            index % 2 === 0 ? "#f8f9fa" : "white",
                          fontSize: "11px",
                          color: "#000000",
                          display: "flex",
                          alignItems: "center",
                          pageBreakInside: "avoid",
                        }}
                      >
                        <span
                          style={{
                            marginLeft: "6px",
                            fontSize: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          •
                        </span>
                        {diet.name}
                      </div>
                    ))}
                  </div>
                )}

                {memberDietPlans.length === 0 &&
                  dietPlanGroups.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#666666",
                        fontSize: "12px",
                        padding: "20px",
                        border: "1px dashed #cccccc",
                      }}
                    >
                      لم يتم تحديد أنظمة غذائية
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="print-section"
            style={{
              marginTop: "20px",
              padding: "12px",
              border: "2px solid #000000",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              pageBreakInside: "avoid",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "6px",
              }}
            >
              نتمنى لك رحلة تدريبية موفقة
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#000000",
                marginBottom: "6px",
              }}
            >
              للاستفسارات والدعم الفني، يرجى التواصل مع إدارة الصالة
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "#666666",
                borderTop: "1px solid #000000",
                paddingTop: "6px",
                marginTop: "6px",
              }}
            >
              تاريخ الإصدار: {formatDate(new Date())} | رقم العضوية: {member.id}
            </div>

            {/* Developer Credit */}
            <div
              style={{
                fontSize: "7px",
                color: "#999999",
                marginTop: "8px",
                paddingTop: "4px",
                borderTop: "1px solid #cccccc",
                lineHeight: "1.2",
              }}
            >
              صمم البرنامج بواسطة حمزه احمد للتواصل واتساب ٠٧٨٠٠٦٥٧٨٢٢
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberPrintTemplateOfficial;
