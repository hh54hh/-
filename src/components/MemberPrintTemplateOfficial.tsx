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
            margin-bottom: 10px;
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

          @page {
            margin: 15mm;
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
            fontSize: "14px",
            lineHeight: "1.4",
            direction: "rtl",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white",
            color: "#000000",
            padding: "15mm",
            pageBreakInside: "avoid",
          }}
        >
        {/* Header with Gym Name and Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "3px solid #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1, textAlign: "right" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#000000",
                margin: "0 0 10px 0",
                letterSpacing: "2px",
              }}
            >
              صالة حسام لكمال الأجسام والرشاقة
            </h1>
            <p
              style={{
                fontSize: "18px",
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
                width: "80px",
                height: "80px",
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

        {/* Member Information - Horizontal Layout */}
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "2px solid #000000",
            backgroundColor: "#f8f9fa",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000000",
              marginBottom: "15px",
              textAlign: "center",
              borderBottom: "1px solid #000000",
              paddingBottom: "8px",
            }}
          >
            المعلومات الشخصية
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#000000",
                }}
              >
                الاسم الكامل
              </div>
              <div
                style={{
                  padding: "8px",
                  border: "1px solid #000000",
                  backgroundColor: "white",
                  fontSize: "14px",
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
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#000000",
                }}
              >
                رقم الهاتف
              </div>
              <div
                style={{
                  padding: "8px",
                  border: "1px solid #000000",
                  backgroundColor: "white",
                  fontSize: "14px",
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
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#000000",
                }}
              >
                العمر
              </div>
              <div
                style={{
                  padding: "8px",
                  border: "1px solid #000000",
                  backgroundColor: "white",
                  fontSize: "14px",
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
                  fontSize: "14px",
                  marginBottom: "5px",
                  color: "#000000",
                }}
              >
                تاريخ الانضمام
              </div>
              <div
                style={{
                  padding: "8px",
                  border: "1px solid #000000",
                  backgroundColor: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {formatDate(member.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
          {/* Right Column - Training Programs */}
          <div
            style={{
              border: "2px solid #000000",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "15px",
                textAlign: "center",
                borderBottom: "1px solid #000000",
                paddingBottom: "8px",
              }}
            >
              البرامج التدريبية
            </h3>

            <div style={{ minHeight: "200px" }}>
              {/* Course Groups */}
              {courseGroups.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  {courseGroups.map((group, index) => (
                    <div
                      key={group.id}
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #000000",
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                      }}
                    >
                      {group.title && (
                        <h4
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#000000",
                            marginBottom: "8px",
                            borderBottom: "1px dashed #000000",
                            paddingBottom: "5px",
                          }}
                        >
                          {group.title}
                        </h4>
                      )}
                      <div style={{ paddingRight: group.title ? "15px" : "0" }}>
                        {group.courses.map((course, courseIndex) => (
                          <div
                            key={course.id}
                            style={{
                              padding: "5px 0",
                              fontSize: "13px",
                              color: "#000000",
                              borderBottom: "1px dotted #cccccc",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                marginLeft: "8px",
                                fontSize: "12px",
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
                      style={{
                        padding: "8px",
                        marginBottom: "5px",
                        border: "1px solid #000000",
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                        fontSize: "13px",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "12px",
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
                    fontSize: "14px",
                    padding: "30px",
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
            style={{
              border: "2px solid #000000",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000000",
                marginBottom: "15px",
                textAlign: "center",
                borderBottom: "1px solid #000000",
                paddingBottom: "8px",
              }}
            >
              الأنظمة الغذائية
            </h3>

            <div style={{ minHeight: "200px" }}>
              {/* Diet Plan Groups */}
              {dietPlanGroups.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  {dietPlanGroups.map((group, index) => (
                    <div
                      key={group.id}
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #000000",
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                      }}
                    >
                      {group.title && (
                        <h4
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#000000",
                            marginBottom: "8px",
                            borderBottom: "1px dashed #000000",
                            paddingBottom: "5px",
                          }}
                        >
                          {group.title}
                        </h4>
                      )}
                      <div style={{ paddingRight: group.title ? "15px" : "0" }}>
                        {group.dietPlans.map((diet, dietIndex) => (
                          <div
                            key={diet.id}
                            style={{
                              padding: "5px 0",
                              fontSize: "13px",
                              color: "#000000",
                              borderBottom: "1px dotted #cccccc",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                marginLeft: "8px",
                                fontSize: "12px",
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
                      style={{
                        padding: "8px",
                        marginBottom: "5px",
                        border: "1px solid #000000",
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                        fontSize: "13px",
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "8px",
                          fontSize: "12px",
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

              {memberDietPlans.length === 0 && dietPlanGroups.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#666666",
                    fontSize: "14px",
                    padding: "30px",
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
          style={{
            marginTop: "30px",
            padding: "15px",
            border: "2px solid #000000",
            backgroundColor: "#f8f9fa",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            نتمنى لك رحلة تدريبية موفقة
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#000000",
              marginBottom: "8px",
            }}
          >
            للاستفسارات والدعم الفني، يرجى التواصل مع إدارة الصالة
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#666666",
              borderTop: "1px solid #000000",
              paddingTop: "8px",
              marginTop: "8px",
            }}
          >
            تاريخ الإصدار: {formatDate(new Date())} | رقم العضوية: {member.id}
          </div>

          {/* Developer Credit */}
          <div
            style={{
              fontSize: "8px",
              color: "#999999",
              marginTop: "10px",
              paddingTop: "5px",
              borderTop: "1px solid #cccccc",
              lineHeight: "1.2",
            }}
          >
            صمم البرنامج بواسطة حمزه احمد للتواصل واتساب ٠٧٨٠٠٦٥٧٨٢٢
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPrintTemplateOfficial;