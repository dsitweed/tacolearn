import { ArrowRight, BarChart3, ShieldCheck, UserCheck } from 'lucide-react';
import Link from 'next/link';

import { Badge, Button } from '@/components/ui';

import { SchoolManagementGraphic } from '../components/SchoolManagementGraphic';

export function ForSchoolsSection() {
  const benefits = [
    {
      title: 'Bảng điều khiển dành cho Ban Quản Lý',
      desc: 'Giám sát tiến độ học tập, tỷ lệ chuyên cần SRS của toàn trường theo từng cơ sở và từng lớp.',
      icon: UserCheck,
    },
    {
      title: 'Tự động phân tích điểm nghẽn kiến thức',
      desc: 'Cảnh báo sớm học viên có nguy cơ tụt lại phía sau trước khi kỳ thi diễn ra.',
      icon: BarChart3,
    },
    {
      title: 'Đồng bộ giáo trình nội bộ',
      desc: 'Dễ dàng tải lên bộ từ vựng, ngữ pháp độc quyền của trung tâm vào hệ thống TacoLearn.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="for-schools"
      className="bg-primary relative overflow-hidden py-16 text-white lg:py-24"
    >
      {/* Background glow */}
      <div className="bg-secondary/20 pointer-events-none absolute top-1/2 left-0 size-96 -translate-y-1/2 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Descriptions */}
          <div className="space-y-6 lg:col-span-6">
            <Badge
              variant="outline"
              className="text-secondary-fixed rounded-full border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold"
            >
              DÀNH CHO TRƯỜNG HỌC & TRUNG TÂM
            </Badge>

            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">
              Số hóa công tác đào tạo cho Trường Nhật ngữ & Trung tâm Du học
            </h2>

            <p className="text-primary-fixed text-base leading-relaxed">
              Giải phóng giáo viên khỏi những giờ làm bảng điểm thủ công và chấm
              flashcard rời rạc. Giúp ban quản lý giám sát chất lượng học tập
              của từng lớp học theo thời gian thực.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 pt-2">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="text-secondary-fixed mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-600/20">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-inverse-primary mt-0.5 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="bg-secondary h-12 rounded-xl px-6 text-sm font-semibold text-white shadow-lg hover:opacity-90"
                asChild
              >
                <Link href="#contact">
                  <span>Liên hệ hợp tác trường học</span>
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Graphic Preview */}
          <div className="lg:col-span-6">
            <SchoolManagementGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
