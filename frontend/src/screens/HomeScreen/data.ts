// Local AI-Generated Campaign Images
export const IMG = {
    sadaqa: 'https://images.unsplash.com/photo-1541819068018-8f53941459ff?q=80&w=800&auto=format&fit=crop',
    relief: 'https://images.unsplash.com/photo-1593113589914-07599018dd05?q=80&w=800&auto=format&fit=crop',
    mosque: 'https://images.unsplash.com/photo-1542644265-d05ea11a51c4?q=80&w=800&auto=format&fit=crop',
    orphans: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    ramadan: 'https://images.unsplash.com/photo-1564769662533-4f00a893410f?q=80&w=800&auto=format&fit=crop',
};

export const BANNERS = [
    { id: 1, title: 'رمضان كريم — أثرك يبقى', sub: 'ساهم في إفطار 10,000 صائم في اليمن', image: IMG.ramadan },
    { id: 2, title: 'حملة سقيا الأمل 2026', sub: 'توفير مياه نظيفة لـ 50 قرية محتاجة', image: IMG.sadaqa },
    { id: 3, title: 'كفالة اليتيم — سعادة له وأجر لك', sub: 'كن رفيق النبي في الجنة بكفالة يتيم', image: IMG.orphans },
];

export const CURRENT_CAMPAIGNS = [
    { id: 1, title: 'إفطار صائم', image: IMG.ramadan, color: '#00A651', items: '12,500 سلة' },
    { id: 2, title: 'كسوة العيد', image: IMG.education, color: '#F5A623', items: '5,000 طفل' },
    { id: 3, title: 'حقيبة الشتاء', image: IMG.relief, color: '#E12A3C', items: '3,000 بطانية' },
];

export const URGENT_PROJECTS = [
    { id: 1, title: 'إغاثة عاجلة لمتضرري السيول — الحديدة', target: 5000000, current: 3250000, category: 'إغاثة', daysLeft: 8, image: IMG.relief, donors: 124 },
    { id: 2, title: 'توفير غاز الطهي والدفء للنازحين', target: 2000000, current: 800000, category: 'إغاثة', daysLeft: 5, image: IMG.sadaqa, donors: 88 },
];

export const SADAQAH_KAFFARAH = [
    { id: 1, title: 'صدقة جارية', icon: 'heart-outline', lib: 'ion', color: '#00A651', desc: 'أثر لا ينقطع' },
    { id: 2, title: 'كفارة يمين', icon: 'shield-checkmark-outline', lib: 'ion', color: '#F5A623', desc: 'إطعام 10 مساكين' },
    { id: 3, title: 'نذر', icon: 'ribbon-outline', lib: 'ion', color: '#4A90E2', desc: 'أوفِ بنذرك لله' },
];

export const IMPACT_STATS = [
    { value: '2.5M+', label: 'مستفيد', icon: 'people-outline', color: '#00A651' },
    { value: '5,200+', label: 'مشروع', icon: 'business-outline', color: '#0096C7' },
    { value: '25+', label: 'دولة', icon: 'globe-outline', color: '#7B2FBE' },
];

export const QUICK_ACTIONS = [
    { id: 1, title: 'حاسبة الزكاة', icon: 'calculator', lib: 'fa5', nav: 'Zakat', bg: '#E5FAEB', color: '#00A651' },
    { id: 2, title: 'صدقة سريعة', icon: 'flash-outline', lib: 'ion', nav: 'Projects', bg: '#FFF4E5', color: '#F5A623' },
    { id: 3, title: 'كفالة يتيم', icon: 'human-child', lib: 'mc', nav: 'Projects', bg: '#F0F0FF', color: '#7B2FBE' },
    { id: 4, title: 'تواصل معنا', icon: 'headset-outline', lib: 'ion', nav: 'HelpSupport', bg: '#F5F5F5', color: '#888' },
];
