import {
  Award,
  Building2,
  GraduationCap,
  School,
  ShieldCheck,
} from 'lucide-react';

export function SocialProofSection() {
  const partners = [
    { name: 'Trường Nhật ngữ Tokyo', icon: School },
    { name: 'Học viện GoToJapan', icon: GraduationCap },
    { name: 'Trung tâm Nihongo Pro', icon: Award },
    { name: 'Đại học Hà Nội', icon: Building2 },
    { name: 'Du học Sakura', icon: ShieldCheck },
    { name: 'Taco EdTech Partner', icon: GraduationCap },
  ];

  return (
    <section className="border-y border-slate-200/80 bg-slate-50/50 py-10 dark:border-slate-800/80 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-slate-400">
          Được tin dùng bởi hơn 45+ trường Nhật ngữ, trung tâm du học và 12,000+
          học viên tại Việt Nam & Nhật Bản{' '}
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200/60 bg-white p-3.5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <Icon className="size-4 text-[#081534] dark:text-emerald-400" />
                <span className="truncate text-xs font-semibold text-[#111C2D] dark:text-slate-200">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
